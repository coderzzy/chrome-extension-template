// 监听来自 content.js 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    return true; // 表示 sendResponse 是异步的
});