import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";


function App() {
  const [isHelperVisible, setIsHelperVisible] = useState(true);

  // 读取小助手的各种已存储的配置
  useEffect(() => {
    if (chrome?.storage?.sync) {
      // 显示 / 隐藏 小助手
      chrome.storage.sync.get("xxHelperVisible", (result) => {
        if (result.helperVisible !== undefined) {
          setIsHelperVisible(result.helperVisible);
        }
      });
    }
  }, []);

  // 切换小助手的显示/隐藏
  const toggleHelper = () => {
    const newVisibility = !isHelperVisible;
    setIsHelperVisible(newVisibility);
    // 存储到 Chrome storage，`content.js` 会自动响应变化
    if (chrome?.storage?.sync) {
      chrome.storage.sync.set({ xxHelperVisible: newVisibility });
    }
  };

  // 还原小助手到默认位置
  const resetHelperPosition = () => {
    // 存储到 Chrome storage，`content.js` 会自动响应变化
    if (chrome?.storage?.sync) {
      chrome.storage.sync.set({
        xxHelperPosition: { leftPercent: 0.95, topPercent: 0.5 }, // 右侧垂直居中的默认位置
      });
    }
  };

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <span style={{ marginRight: '10px' }}>展示小助手</span>
          <label className="switch">
            <input type="checkbox" checked={isHelperVisible} onChange={toggleHelper} />
            <span className="slider round"></span>
          </label>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <button onClick={resetHelperPosition}>
            还原默认位置
          </button>
        </div>
      </div>
      {/* 添加页脚 */}
      <footer style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>版权所有 &copy; 2025 xx小助手</p>
        <p>如有反馈，请联系 <a href="mailto:xxx@163.com">xxx@163.com</a></p>
      </footer>
    </>
  );
}

export default App;