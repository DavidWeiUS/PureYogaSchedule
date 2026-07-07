# PureYoga 课程表生成器 — 部署指南

## 文件结构

```
pureyoga/
├── server.js          # 后端服务（转发 API 请求）
├── package.json       # 项目依赖
├── render.yaml        # Render 部署配置
└── public/
    ├── index.html     # 前端页面
    └── logo.png       # 工作室 Logo
```

---

## 部署步骤（约 15 分钟）

### 第一步：注册 Render 账号
1. 打开 https://render.com
2. 点击 "Get Started"，用 GitHub 账号登录（没有的话先注册一个 GitHub 账号）

### 第二步：获取 Anthropic API Key
1. 打开 https://console.anthropic.com
2. 注册/登录后，点击左侧 "API Keys"
3. 点击 "Create Key"，复制保存好这个 Key（格式：sk-ant-...）

### 第三步：上传代码到 GitHub
1. 打开 https://github.com，点击右上角 "+" → "New repository"
2. 仓库名填 "pureyoga-schedule"，选 Private，点击创建
3. 按照 GitHub 页面上的提示，把这个文件夹的代码推送上去
   （或者直接把文件一个个拖拽上传到 GitHub 网页界面）

### 第四步：在 Render 部署
1. 登录 Render 后，点击右上角 "New +" → "Web Service"
2. 选择 "Build and deploy from a Git repository"，授权并选择你刚创建的仓库
3. Render 会读取仓库里的 `render.yaml` 自动填好配置（Node 环境、启动命令 `node server.js`）；如果没有自动识别，手动填：
   - Build Command：`npm install`
   - Start Command：`node server.js`
4. Instance Type 选 "Free" 即可

### 第五步：配置环境变量（关键！）
1. 在服务创建页面（或创建后 "Environment" 标签）里点击 "Add Environment Variable"
2. 添加：
   - Key：`ANTHROPIC_API_KEY`，Value：你在第二步复制的 Key（sk-ant-...）
   - Key：`ACCESS_PASSWORD`，Value：自定义一个访问密码（不设置则默认 `yoga2026`）
3. 保存后 Render 会自动重新部署

### 第六步：获取你的网址
1. 部署成功后，页面顶部会显示一个类似 `https://pureyoga-schedule.onrender.com` 的网址
2. 打开这个网址，就能看到课表生成器了！

---

## 使用方法

1. 用手机或电脑浏览器打开你的网址，输入访问密码登录
2. 在文本框里输入下周课程安排（随意描述）
3. 选择喜欢的课表风格（简约现代、宋式雅集、暗夜金辉等 10 种可选）
4. 点击"生成课表"，等待几秒
5. 点击"保存图片"下载课表图片
6. 把图片发到微信群或朋友圈

---

## 费用说明

- Render：Free 套餐足够轻度使用；免费实例在无请求一段时间后会休眠，下次访问需要几十秒唤醒
- Anthropic API：每次生成课表大约消耗 $0.001（即 0.1 分钱），可忽略不计

---

## 常见问题

**Q：生成失败怎么办？**
A：检查 Render 的 Environment 里 `ANTHROPIC_API_KEY` 是否正确填写，注意不要有多余的空格。

**Q：打开网址很慢/白屏？**
A：Render 免费实例休眠后首次访问需要唤醒时间，稍等片刻刷新即可。

**Q：图片里的 Logo 没显示？**
A：确认 `public/logo.png` 文件已经上传到 GitHub 仓库。

**Q：网址能分享给别人用吗？**
A：可以，但建议只告知家人，避免 API 费用失控。已内置密码登录，也可以在环境变量里自定义 `ACCESS_PASSWORD`。
