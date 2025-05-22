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
    }
  } else if (command === "inc_speed") {
    video.playbackRate = Math.min(video.playbackRate + 0.25, 4);
    console.log(`Speed increased to ${video.playbackRate.toFixed(2)}x`);
  } else if (command === "dec_speed") {
    video.playbackRate = Math.max(video.playbackRate - 0.25, 0.25);
    console.log(`Speed decreased to ${video.playbackRate.toFixed(2)}x`);
  }
}
