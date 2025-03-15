## chrome插件 —— xx助手模板项目
### 产品详情
![Image text](https://github.com/coderzzy/chrome-extension-template/blob/main/promotional_assets/screenshot.jpg)
- 标题：
- 摘要：
- 说明：
    - ...
    - ⚠️ 根据 Google 规则，插件无法在 Chrome Web Store 页面和内部浏览器页面（如主页、设置和下载）上工作。

### 项目结构
- 基于 Vite + React + Typescript
- 目录说明：
```
chrome-extension-template/
│── public/
│   ├── content.js          # 注入目标网页的内容，如悬浮框、鼠标操作监听
│   ├── background.js       # 后台运行脚本
│   ├── manifest.json       # Chrome 插件配置文件
│── src/
│   ├── App.jsx             # React 组件
│   ├── main.jsx            # React 入口文件
│── index.html              # 插件首页
│── package.json            # 项目依赖
│── vite.config.js          # Vite 配置
│── dist/                   # 构建后文件（Chrome 插件最终上传的代码）
│── node_modules/           # 依赖包（自动生成）
│── .gitignore              # Git 忽略文件
│── README.md               # 说明文档
```

### 项目运行
```
# 1. 安装依赖
npm install

# 2. build，生成dist目录
npm run build

# 3. 打开Chrome，进入扩展程序页面，加载dist目录
```

### 版本记录
- v1.0 
