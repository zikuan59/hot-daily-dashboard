import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', // ✅ 确保静态资源使用相对路径
  build: {
    outDir: 'dist', // ✅ 构建输出目录（Vercel 默认会部署这个）
    emptyOutDir: true, // 🚀 每次构建清空 dist
  },
  server: {
    host: true,  // 🌐 允许外部访问（方便局域网预览）
    port: 5173,  // ✅ 本地端口（无所谓，可保留）
  },
})
