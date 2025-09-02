async function cleanURL(url, settings) {
  try {
    const urlObj = new URL(url);
    
    if (settings.mode === 'whitelist') {
      const newUrl = new URL(url);
      const whitelist = settings.whitelist.map(p => p.toLowerCase());
      
      for (const [key] of newUrl.searchParams) {
        if (!whitelist.includes(key.toLowerCase())) {
          newUrl.searchParams.delete(key);
        }
      }
      
      return newUrl.toString();
    } else if (settings.mode === 'blacklist') {
      const newUrl = new URL(url);
      const blacklist = settings.blacklist.map(p => p.toLowerCase());
      
      for (const [key] of newUrl.searchParams) {
        if (blacklist.includes(key.toLowerCase())) {
          newUrl.searchParams.delete(key);
        }
      }
      
      return newUrl.toString();
    } else {
      return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;
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

function showStatus(message, type) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = `status ${type}`;
  
  if (type === 'success') {
    setTimeout(() => {
      status.style.display = 'none';
    }, 2000);
  }
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

async function saveSettings(settings) {
  try {
    await chrome.storage.sync.set(settings);
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

async function cleanClipboardURL() {
  const button = document.getElementById('cleanButton');
  
  try {
    button.disabled = true;
    button.textContent = 'Cleaning...';
    
    const clipboardText = await navigator.clipboard.readText();
    const settings = await getSettings();
    
    if (!clipboardText) {
      showStatus('Clipboard is empty', 'error');
      return;
    }
    
    if (!isValidURL(clipboardText)) {
      showStatus('Clipboard does not contain a valid URL', 'error');
      return;
    }
    
    const cleanedURL = await cleanURL(clipboardText, settings);
    
    if (!cleanedURL) {
      showStatus('Unable to clean URL', 'error');
      return;
    }
    
    if (cleanedURL === clipboardText) {
      showStatus('URL is already clean', 'success');
      return;
    }
    
    await navigator.clipboard.writeText(cleanedURL);
    showStatus('URL cleaned and copied!', 'success');
    
  } catch (error) {
    console.error('Error cleaning URL:', error);
    showStatus('Error accessing clipboard', 'error');
  } finally {
    button.disabled = false;
    button.textContent = 'Clean URL';
  }
}

async function loadSettings() {
  const settings = await getSettings();
  
  document.querySelector(`input[name="mode"][value="${settings.mode}"]`).checked = true;
  document.getElementById('whitelist').value = settings.whitelist.join(', ');
  document.getElementById('blacklist').value = settings.blacklist.join(', ');
  
  updateModeVisibility();
}

function updateModeVisibility() {
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const whitelistGroup = document.getElementById('whitelist-group');
  const blacklistGroup = document.getElementById('blacklist-group');
  
  whitelistGroup.style.display = mode === 'whitelist' ? 'block' : 'none';
  blacklistGroup.style.display = mode === 'blacklist' ? 'block' : 'none';
}

async function handleSettingsChange() {
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const whitelist = document.getElementById('whitelist').value
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);
  const blacklist = document.getElementById('blacklist').value
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);
  
  await saveSettings({ mode, whitelist, blacklist });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cleanButton').addEventListener('click', cleanClipboardURL);
  
  const modeInputs = document.querySelectorAll('input[name="mode"]');
  modeInputs.forEach(input => {
    input.addEventListener('change', () => {
      updateModeVisibility();
      handleSettingsChange();
    });
  });
  
  document.getElementById('whitelist').addEventListener('input', handleSettingsChange);
  document.getElementById('blacklist').addEventListener('input', handleSettingsChange);
  
  loadSettings();
});