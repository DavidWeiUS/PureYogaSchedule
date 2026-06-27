# PureYoga 课程表生成器 — 部署指南

## 文件结构

```
pureyoga/
├── server.js          # 后端服务（转发 API 请求）
├── package.json       # 项目依赖
├── railway.toml       # Railway 部署配置
└── public/
    ├── index.html     # 前端页面
    └── logo.png       # 工作室 Logo
```

---

## 部署步骤（约 20 分钟）

### 第一步：注册 Railway 账号
1. 打开 https://railway.app
2. 点击 "Login with GitHub"（需要一个 GitHub 账号，没有的话先注册）

### 第二步：获取 Anthropic API Key
1. 打开 https://console.anthropic.com
2. 注册/登录后，点击左侧 "API Keys"
3. 点击 "Create Key"，复制保存好这个 Key（格式：sk-ant-...）

### 第三步：上传代码到 GitHub
1. 打开 https://github.com，点击右上角 "+" → "New repository"
2. 仓库名填 "pureyoga-schedule"，选 Private，点击创建
3. 按照 GitHub 页面上的提示，把这个文件夹的代码推送上去
   （或者直接把文件一个个拖拽上传到 GitHub 网页界面）

### 第四步：在 Railway 部署
1. 登录 Railway 后，点击 "New Project"
2. 选择 "Deploy from GitHub repo"
3. 选择你刚才创建的 "pureyoga-schedule" 仓库
4. Railway 会自动检测并开始部署

### 第五步：配置 API Key（关键！）
1. 在 Railway 项目页面，点击你的服务
2. 点击顶部 "Variables" 标签
3. 点击 "Add Variable"
4. Name 填：`ANTHROPIC_API_KEY`
5. Value 填：你在第二步复制的 Key（sk-ant-...）
6. 点击 Save，Railway 会自动重启服务

### 第六步：获取你的网址
1. 点击 Railway 项目页面的 "Settings" → "Domains"
2. 点击 "Generate Domain"，会得到一个类似 pureyoga-schedule.up.railway.app 的网址
3. 打开这个网址，就能看到课表生成器了！

---

## 使用方法

1. 用手机或电脑浏览器打开你的网址
2. 在文本框里输入下周课程安排（随意描述）
3. 点击"生成课表"，等待几秒
4. 点击"保存图片"下载课表图片
5. 把图片发到微信群或朋友圈

---

## 费用说明

- Railway：每月有 $5 免费额度，轻度使用完全够用，超出后按量计费极低
- Anthropic API：每次生成课表大约消耗 $0.001（即 0.1 分钱），可忽略不计

---

## 常见问题

**Q：生成失败怎么办？**
A：检查 Railway 的 Variables 里 ANTHROPIC_API_KEY 是否正确填写，注意不要有多余的空格。

**Q：图片里的 Logo 没显示？**
A：确认 public/logo.png 文件已经上传到 GitHub 仓库。

**Q：网址能分享给别人用吗？**
A：可以，但建议只告知家人，避免 API 费用失控。如有需要可加登录验证。
