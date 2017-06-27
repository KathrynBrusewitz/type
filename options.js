const backgroundColor = document.getElementById('backgroundColor');
const fontColor = document.getElementById('fontColor');
const status = document.getElementById('status');

// Save options to chrome.storage.sync
const saveOptions = () => {
  chrome.storage.sync.set({
    backgroundColor: backgroundColor.value,
    fontColor: fontColor.value,
  }, () => {
    // Let user know options were saved
    status.textContent = 'Settings have been saved.';
    status.classList.add('status-save');
    status.style.visibility = 'visible';
    setTimeout(() => {
      status.textContent = '';
      status.style.visibility = 'hidden';
      status.classList.remove('status-save');
    }, 2000);
  });
};

// Restore option states using the preferences stored in chrome.storage
const restoreOptions = () => {
  // Defaults
  chrome.storage.sync.get({
    backgroundColor: 'fcfcfc',
    fontColor: '2b2b2b',
  }, (res) => {
    backgroundColor.value = res.backgroundColor;
    fontColor.value = res.fontColor;
    Object.assign(backgroundColor.style, {
      backgroundColor: `#${res.backgroundColor}`,
    });
    Object.assign(fontColor.style, {
      backgroundColor: `#${res.fontColor}`,
    });
  });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
