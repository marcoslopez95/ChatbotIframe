import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `chatbotIframe-pulpodin-v1.0.0.js`,
        assetFileNames: `assets/chatbotIframe-pulpodin-[name]-v1.0.0.[ext]`,
      },
    },
  },
})
