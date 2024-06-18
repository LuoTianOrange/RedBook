import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': "./src",
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081', //目标url
        changeOrigin: true, //支持跨域
        rewrite: (path) => path.replace(/^\/api/, ""), 
          //重写路径,替换/api
      }
    }
  },
  define: {
    __DEV__: process.env.NODE_ENV === 'development',
  }
})
