import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  fileURLToPath, URL 
} from 'url'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        plus3: resolve(__dirname, 'plus4.html')
      }
    }
  },
  base: '/rich',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
