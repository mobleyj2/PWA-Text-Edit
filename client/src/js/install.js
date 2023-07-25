
const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;


window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === 'accepted') {
      console.log('PWA installed successfully!');
    } else {
      console.log('PWA installation declined!');
    }
    // Reset deferredPrompt
    deferredPrompt = null;
    // Hide the custom button
    butInstall.style.display = 'none';
  }
});


window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed!');
});
