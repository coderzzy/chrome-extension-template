import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
        background: "public/background.js" // 让 Vite 处理 background.js
      },
      output: {
        entryFileNames: "[name].js" // 生成 dist/background.js
      }
    }
  }
})
