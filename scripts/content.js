async function cleanURL(url) {
  try {
    const urlObj = new URL(url);
    const settings = await getSettings();
    
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

function showNotification(message) {
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
}

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

let isProcessing = false;

async function handleCopyEvent() {
  if (isProcessing) return;
  
  try {
    isProcessing = true;
    
    // Check if clipboard API is available and not blocked
    if (!navigator.clipboard || !navigator.clipboard.readText) {
      return;
    }
    
    const clipboardText = await navigator.clipboard.readText();
    
    if (!clipboardText || !isValidURL(clipboardText)) {
      return;
    }

    const cleanedURL = await cleanURL(clipboardText);
    
    if (!cleanedURL || cleanedURL === clipboardText) {
      return;
    }

    await navigator.clipboard.writeText(cleanedURL);
    showNotification('Link cleaned!');
    
  } catch (error) {
    // Silently ignore clipboard access errors on restricted sites
    if (error.name === 'NotAllowedError' || error.message.includes('permissions policy')) {
      return;
    }
    console.log('Clean Links: Could not access clipboard', error);
  } finally {
    isProcessing = false;
  }
}

// Check if we're on a site that blocks clipboard access
function isRestrictedSite() {
  const restrictedDomains = ['web.whatsapp.com', 'wa.me'];
  return restrictedDomains.some(domain => window.location.hostname.includes(domain));
}

// Only add event listeners if clipboard access might be available
if (!isRestrictedSite()) {
  document.addEventListener('copy', () => {
    setTimeout(handleCopyEvent, 10);
  });

  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
      setTimeout(handleCopyEvent, 10);
    }
  });
}

console.log('Clean Links extension loaded');