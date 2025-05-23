chrome.commands.onCommand.addListener(async (command) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: handleHotstarCommand,
      args: [command],
    });
  }
});

function handleHotstarCommand(command) {
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

function showToast(message, flag) {
  const parent = document.fullscreenElement || document.body;

  let gravity, position, backgroundColor;

  if (flag === 1) {
    gravity = "top";
    position = "right";
    backgroundColor = "#11ed11"; //hara
  } else if (flag === 0) {
    gravity = "bottom";
    position = "right";
    backgroundColor = "#ed1111"; //Laal
  } else {
    gravity = "top";
    position = "left";
    backgroundColor = "#e611ed"; //gulabi
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
