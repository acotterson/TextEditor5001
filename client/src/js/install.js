const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// Store the event and reveal the button
window.addEventListener("beforeinstallprompt", (event) => {
  window.deferredPrompt = event;

  butInstall.classList.toggle("hidden", false);
});

// show prompt and then reset the prompt variable
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

  window.deferredPrompt = null;

  butInstall.classList.toggle("hidden", true);
});

// clear the prompt
window.addEventListener("appinstalled", (event) => {
  window.deferredPrompt = null;
});
