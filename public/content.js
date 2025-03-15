// 创建小助手的浮动 UI
const xxHelper = document.createElement("div");
xxHelper.id = "xx-helper";
xxHelper.innerHTML = `<div class="xx-text">xx小助手🚀</div>`;
document.body.appendChild(xxHelper);
// **🔹 添加 CSS 样式**
const style = document.createElement("style");
style.innerHTML = `
    #xx-helper {
        position: fixed;
        background-color: yellow;
        color: black;
        padding: 10px 15px;
        border-radius: 12px;
        box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        z-index: 9999;
        min-width: 140px;
    }
    .xx-text {
        font-size: 18px;
        margin-bottom: 6px;
    }
    /* 防止在其他元素上显示 grab */
    body {
        cursor: auto; /* 确保默认 cursor 状态为 auto */
    }
    #xx-helper {
        cursor: auto; /* 确保小助手中的区域没有抓取光标 */
    }
`;
document.head.appendChild(style);

// -------------------------------- listener ------------------------------

if (chrome?.storage?.sync) {
    // 设置初始值
    chrome.storage.sync.get(["xxHelperVisible", "xxHelperPosition"], (result) => {
        // 是否展示小助手
        if (result.xxHelperVisible === false) {
            xxHelper.style.display = "none";
        }
        // 小助手位置
        if (result.xxHelperPosition) {
            updateHelperPosition(result.xxHelperPosition);
        } else {
            const defaultLeft = window.innerWidth - xxHelper.offsetWidth - 20;
            const defaultTop = window.innerHeight / 2 - xxHelper.offsetHeight / 2;
            xxHelper.style.left = defaultLeft + "px";
            xxHelper.style.top = defaultTop + "px";
        }
    });

    // 监听改变
    chrome.storage.onChanged.addListener((changes) => {
        if (changes.xxHelperVisible) {
            xxHelper.style.display = changes.xxHelperVisible.newValue ? "block" : "none";
        }
        if (changes.xxHelperPosition) {
            updateHelperPosition(changes.xxHelperPosition.newValue);
        }
    });
} else {
    console.error("chrome.storage.sync is not available.");
}

// 监听窗口大小变化，调整小助手位置
window.addEventListener("resize", () => {
    chrome.storage.sync.get("xxHelperPosition", (result) => {
        if (result.xxHelperPosition) {
            updateHelperPosition(result.xxHelperPosition);
        }
    });
});

// ----------------------------------- **🔹 添加鼠标拖拽功能**
let isDragging = false;
let offsetX, offsetY;

// 鼠标按下，准备拖动
xxHelper.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - xxHelper.offsetLeft;
    offsetY = e.clientY - xxHelper.offsetTop;
    xxHelper.style.cursor = "grabbing";
});

// 鼠标移动，更新位置
document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        let left = e.clientX - offsetX;
        let top = e.clientY - offsetY;

        left = Math.max(0, Math.min(window.innerWidth - xxHelper.offsetWidth, left));
        top = Math.max(0, Math.min(window.innerHeight - xxHelper.offsetHeight, top));

        xxHelper.style.left = left + "px";
        xxHelper.style.top = top + "px";
    }
});

// 鼠标释放，保存**相对位置**
document.addEventListener("mouseup", () => {
    if (isDragging) {
        isDragging = false;
        xxHelper.style.cursor = "grab";

        chrome.storage.sync.set({
            xxHelperPosition: {
                leftPercent: xxHelper.offsetLeft / window.innerWidth,
                topPercent: xxHelper.offsetTop / window.innerHeight
            }
        });
    }
});

// -------------------------------- function ------------------------------

// 更新小助手位置（支持百分比）
function updateHelperPosition(position) {
    let left = position.leftPercent * window.innerWidth;
    let top = position.topPercent * window.innerHeight;

    left = Math.max(0, Math.min(window.innerWidth - xxHelper.offsetWidth, left));
    top = Math.max(0, Math.min(window.innerHeight - xxHelper.offsetHeight, top));

    xxHelper.style.left = left + "px";
    xxHelper.style.top = top + "px";
}