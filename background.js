let paused = true;

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url.includes("calendar.google.com")) {
    return;
  }
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === "ON" ? "OFF" : "ON";

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  if (nextState === "ON") {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["start.js"],
    });

    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["brick.css"],
    });
  } else if (nextState === "OFF") {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["stop.js"],
    });
  }
});
