# hot-daily-dashboard

## 简介（中文）
这是一个「科技 + AI + 综合新闻」热点聚合仪表盘，前端使用 Vue 3 + Vite + Tailwind，后端使用 Vercel Serverless API（api/*.js）抓取：百度热搜、知乎热榜、Hacker News、Product Hunt（需 PH_TOKEN）。

### 本地开发（快速）
1. 克隆仓库并进入目录
```bash
npm install
npm run dev
```
2. 前端访问 http://localhost:5173

### 本地测试 API（可选）
如果你想在本地测试 API，可以运行：
```bash
node server.js
```
然后访问 http://localhost:3000/api/baidu

### 部署到 Vercel
1. 推送到 GitHub
2. 在 Vercel 新建项目并关联仓库
3. 在 Vercel 环境变量中添加 `PH_TOKEN`（如需 Product Hunt）
4. Build Command: `npm run build`，Output Directory: `dist`
5. Deploy，完成后访问你的站点 URL

### 注意
- 请合理使用抓取频率，尊重目标站点的 robots.txt 与使用条款。
- 如果某个源的页面结构发生变化，抓取脚本可能需要调整选择器（cheerio 部分）。

---

## README (English)

### Overview
This is a "Tech + AI + General News" hot-trends dashboard. Frontend: Vue 3 + Vite + Tailwind. Backend: Vercel Serverless API (`api/*.js`) scrapes Baidu Realtime, Zhihu Hot, Hacker News, and Product Hunt (Product Hunt requires `PH_TOKEN`).

### Local development
```bash
npm install
npm run dev
```
Open http://localhost:5173

### Local API testing (optional)
Run the local express server:
```bash
node server.js
```
Visit http://localhost:3000/api/baidu

### Deploy to Vercel
1. Push repo to GitHub
2. Import project on Vercel
3. Set environment variable `PH_TOKEN` on Vercel (if using Product Hunt)
4. Build Command: `npm run build`, Output Directory: `dist`
5. Deploy

### Notes
- Use scraping responsibly and follow sites' TOS.
- If a source's HTML structure changes, update the cheerio selectors accordingly.
