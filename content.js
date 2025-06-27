
(() => {
  if (window.__hotstarExtensionInjected) {
    console.log("Already injected, skipping script");
    return;
  }
  window.__hotstarExtensionInjected = true;
  //console.log("content.js injected at", location.href);

  if (!window.__hotstarListenerAttached) {
    console.log("Adding message listener");

    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === "hotstar-cmd") {
        console.log("✅ Received command:", msg.command);
        handleHotstarCommand(msg.command);
      }
    });

    window.__hotstarListenerAttached = true;
  }

  function showToast(message, flag) {
    const parent = document.fullscreenElement || document.body;

    let gravity, position, backgroundColor;

    if (flag === 1) {
      gravity = "top";
      position = "right";
      backgroundColor = "#11ed11"; // hara
    } else if (flag === 0) {
      gravity = "bottom";
      position = "right";
      backgroundColor = "#ed1111"; // laal
    } else {
      gravity = "top";
      position = "left";
      backgroundColor = "#e611ed"; // gulabi
    }

    const toast = Toastify({
      text: message,
      duration: 2000,
      gravity: gravity,
      position: position,
      backgroundColor: backgroundColor,
      stopOnFocus: true,
    });

    toast.options.selector = parent;
    toast.showToast();
  }

  function handleHotstarCommand(command) {
    console.log("🎯 Handling command:", command);
    const video = document.querySelector("video");
    if (!video) return;

    if (command === "skip-hotstar-ad") {
      const adElement = document.querySelector('[data-testid="ad-head"]');
      if (adElement !== null) {
        video.playbackRate = 15;
        showToast("Skipping Ads", 3);
      }
    } else if (command === "inc_speed") {
      video.playbackRate = Math.min(video.playbackRate + 0.25, 4);
      console.log(`Speed increased to ${video.playbackRate.toFixed(2)}x`);
      showToast(`Speed: ${video.playbackRate.toFixed(2)}x`, 1);
    } else if (command === "dec_speed") {
      video.playbackRate = Math.max(video.playbackRate - 0.25, 0.25);
      console.log(`Speed decreased to ${video.playbackRate.toFixed(2)}x`);
      showToast(`Speed: ${video.playbackRate.toFixed(2)}x`, 0);
    }
  }
})();
