//issue is on each press content.js is loaded again and again mkaing it run multiple times
// fix is using set for unique tab ids
const injectedTabs=new Set();


chrome.commands.onCommand.addListener(async (command) => {
  //console.log("COMMAND RECV", command);


  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

 // Inject only ONCE per tab
  if (!injectedTabs.has(tab.id)) {
   // console.log("Injecting content.js into tab", tab.id);
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["toastify.min.js", "content.js"]
    });
    injectedTabs.add(tab.id);
  }

  // Send command after injection
  chrome.tabs.sendMessage(tab.id, {
    type: "hotstar-cmd",
    command
  }).catch((err) => {
    console.error("❌ sendMessage failed:", err);
  });
});