function cleanURL(url) {
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;
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

let isProcessing = false;

async function handleCopyEvent() {
  if (isProcessing) return;
  
  try {
    isProcessing = true;
    const clipboardText = await navigator.clipboard.readText();
    
    if (!clipboardText || !isValidURL(clipboardText)) {
      return;
    }

    const cleanedURL = cleanURL(clipboardText);
    
    if (!cleanedURL || cleanedURL === clipboardText) {
      return;
    }

    await navigator.clipboard.writeText(cleanedURL);
    showNotification('Link cleaned!');
    
  } catch (error) {
    console.log('Clean Links: Could not access clipboard', error);
  } finally {
    isProcessing = false;
  }
}

document.addEventListener('copy', () => {
  setTimeout(handleCopyEvent, 10);
});

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
    setTimeout(handleCopyEvent, 10);
  }
});

console.log('Clean Links extension loaded');