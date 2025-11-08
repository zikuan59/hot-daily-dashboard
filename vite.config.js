import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',  // ✅ 这一行非常关键
  build: {
    outDir: 'dist'
  },
  server: {
    port: 5173
  }
})
