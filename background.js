let paused = true;

let state = "OFF";

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url.includes("calendar.google.com")) {
    return;
  }
  state = state === "ON" ? "OFF" : "ON";

  if (state === "ON") {
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: " ",
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["start.js"],
    });

    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["brick.css"],
    });
  } else if (state === "OFF") {
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: "",
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["stop.js"],
    });
  }
});
