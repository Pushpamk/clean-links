async function getSettings() {
  try {
    const result = await chrome.storage.sync.get({
      mode: 'remove_all',
      whitelist: [],
      blacklist: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'ref', 'fbclid', 'gclid']
    });
    return result;
  } catch (error) {
    return {
      mode: 'remove_all',
      whitelist: [],
      blacklist: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'ref', 'fbclid', 'gclid']
    };
  }
}

async function cleanURL(url, settings) {
  try {
    const urlObj = new URL(url);
    
    if (settings.mode === 'whitelist') {
      const newUrl = new URL(url);
      const whitelist = settings.whitelist.map(p => p.toLowerCase());
      
      // Clear all search params first, then add back whitelisted ones
      const paramsToKeep = [];
      for (const [key, value] of newUrl.searchParams) {
        if (whitelist.includes(key.toLowerCase())) {
          paramsToKeep.push([key, value]);
        }
      }
      
      newUrl.search = '';
      newUrl.hash = '';
      
      for (const [key, value] of paramsToKeep) {
        newUrl.searchParams.set(key, value);
      }
      
      return newUrl.toString();
    } else if (settings.mode === 'blacklist') {
      const newUrl = new URL(url);
      const blacklist = settings.blacklist.map(p => p.toLowerCase());
      
      // Remove blacklisted params
      for (const [key] of [...newUrl.searchParams]) {
        if (blacklist.includes(key.toLowerCase())) {
          newUrl.searchParams.delete(key);
        }
      }
      
      // Clear hash/fragment
      newUrl.hash = '';
      
      return newUrl.toString();
    } else {
      // Remove all mode - clean everything
      const cleanUrl = `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;
      return cleanUrl;
    }
  } catch (error) {
    return null;
  }
}

function isValidURL(text) {
  try {
    new URL(text);
    return text.startsWith('http://') || text.startsWith('https://');
  } catch (error) {
    return false;
  }
}

function detectSuspiciousCharacters(url) {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    
    // Check for non-ASCII characters that could be homoglyphs
    const suspiciousChars = [];
    const allowedChars = /^[a-zA-Z0-9.-]+$/;
    
    if (!allowedChars.test(domain)) {
      // Find suspicious characters
      for (let i = 0; i < domain.length; i++) {
        const char = domain[i];
        if (!/[a-zA-Z0-9.-]/.test(char)) {
          suspiciousChars.push(char);
        }
      }
    }
    
    return {
      hasSuspiciousChars: suspiciousChars.length > 0,
      suspiciousChars: [...new Set(suspiciousChars)],
      domain: domain
    };
  } catch (error) {
    return { hasSuspiciousChars: false, suspiciousChars: [], domain: '' };
  }
}

async function showNotification(message, isWarning = false) {
  try {
    await chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: 'Clean Links',
      message: message,
      priority: isWarning ? 2 : 1
    });
  } catch (error) {
    console.log('Could not show notification:', error);
  }
}

async function cleanClipboardURL() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: async () => {
        try {
          return await navigator.clipboard.readText();
        } catch (error) {
          return null;
        }
      }
    });
    
    const clipboardText = results[0]?.result;
    
    if (!clipboardText) {
      await showNotification('Clipboard is empty');
      return;
    }
    
    if (!isValidURL(clipboardText)) {
      await showNotification('Clipboard does not contain a valid URL');
      return;
    }
    
    // Check for suspicious characters first
    const suspiciousCheck = detectSuspiciousCharacters(clipboardText);
    if (suspiciousCheck.hasSuspiciousChars) {
      await showNotification(`⚠️ PHISHING WARNING: Suspicious characters in "${suspiciousCheck.domain}": ${suspiciousCheck.suspiciousChars.join(', ')}`, true);
      return; // Don't clean suspicious URLs
    }
    
    const settings = await getSettings();
    const cleanedURL = await cleanURL(clipboardText, settings);
    
    if (!cleanedURL) {
      await showNotification('Unable to clean URL');
      return;
    }
    
    if (cleanedURL === clipboardText) {
      await showNotification('URL is already clean');
      return;
    }
    
    // Convert to lowercase for consistency
    const finalURL = cleanedURL.toLowerCase();
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: async (url) => {
        try {
          await navigator.clipboard.writeText(url);
        } catch (error) {
          console.error('Failed to write to clipboard:', error);
        }
      },
      args: [finalURL]
    });

    // Show both desktop notification and page notification
    await showNotification('URL cleaned and copied!');
    
    // Also show the visual notification on the page (like automatic cleaning)
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: (message) => {
        // Create the same notification as automatic cleaning
        const existingNotification = document.getElementById('clean-links-notification');
        if (existingNotification) {
          existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.id = 'clean-links-notification';
        notification.className = 'clean-links-toast';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 2500);
      },
      args: ['Link cleaned!']
    });
    
  } catch (error) {
    console.error('Error in cleanClipboardURL:', error);
    await showNotification('Error accessing clipboard');
  }
}

chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'clean-url') {
    await cleanClipboardURL();
  }
});