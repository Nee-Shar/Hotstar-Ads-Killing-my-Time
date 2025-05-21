(function skipHotstarAd() {
  const video = document.querySelector("video");
  const adElement = document.querySelector('[data-testid="ad-head"]');

  if (!video) {
    console.log("No video element found.");
    return;
  }

  if (adElement !== null) {
    video.playbackRate = 15;
    video.volume = 0;
    console.log("Ad detected — sped up and muted.");
    video.volume = 0.5;
  }
})();
