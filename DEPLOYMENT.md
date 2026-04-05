# 部署指南

本指南将帮助你将学习成果展示页部署到公网。

## 🚀 快速部署到Vercel（推荐）

### 1. 准备工作
- 注册Vercel账号：https://vercel.com/signup
- 安装Git（如果还没有）

### 2. 初始化Git仓库
```bash
cd D:\claude\Display page\learning-portfolio
git init
git add .
git commit -m "Initial commit: 学习成果展示页"
```

### 3. 推送到GitHub
```bash
# 在GitHub创建新仓库，然后运行：
git remote add origin https://github.com/你的用户名/learning-portfolio.git
git branch -M main
git push -u origin main
```

### 4. 连接Vercel
1. 访问 https://vercel.com/new
2. 选择你的GitHub仓库
3. 点击"Import"
4. Vercel会自动检测Next.js项目
5. 点击"Deploy"

✅ 完成！你的网站将在几分钟内上线。

## 🌐 部署到Netlify

### 1. 准备工作
- 注册Netlify账号：https://app.netlify.com/signup
- 推送代码到GitHub（参考上面的步骤）

### 2. 连接Netlify
1. 访问 https://app.netlify.com/start
2. 选择"Import from Git"
3. 选择你的GitHub仓库
4. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `.next`
5. 点击"Deploy site"

✅ 完成！你的网站将在几分钟内上线。

## 🔧 自定义域名

### Vercel
1. 在项目设置中点击"Domains"
2. 添加你的域名
3. 按照提示配置DNS记录

### Netlify
1. 在站点设置中点击"Domain management"
2. 点击"Add custom domain"
3. 按照提示配置DNS记录

## 📊 性能优化建议

部署后，运行Lighthouse测试：
1. 打开Chrome DevTools
2. 切换到"Lighthouse"标签
3. 选择"Mobile"设备
4. 点击"Analyze page load"

目标分数：
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: ≥ 95

## 🐛 常见问题

### Q: 图片加载慢怎么办？
A: Next.js会自动优化图片。确保使用了`next/image`组件。

### Q: 部署后样式不正常？
A: 检查`tailwind.config.ts`和`postcss.config.mjs`配置是否正确。

### Q: 如何更新网站？
A: 推送新代码到GitHub，Vercel/Netlify会自动重新部署。

```bash
git add .
git commit -m "更新内容"
git push
```

## 📧 需要帮助？

如有问题，欢迎联系：2069904600@qq.com
