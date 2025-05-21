chrome.commands.onCommand.addListener(async (command) => {
  if (command === "skip-hotstar-ad") {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tab && tab.id) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });
    }
  }
});
