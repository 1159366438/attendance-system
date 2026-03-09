import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // 1. 插件配置
  plugins: [vue()],
  
  // 2. 路径别名（可选，方便导入）
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  
  // 3. 开发服务器配置（核心：代理后端8080接口，解决跨域+统一地址）
  server: {
    proxy: {
      // 匹配所有以 /api 开头的请求，转发到后端8080
      '/api': {
        target: 'http://localhost:8080', // 后端8080地址
        changeOrigin: true, // 开启跨域
        //rewrite: (path) => path.replace(/^\/api/, '') // 若后端接口无/api前缀，需开启此行
      }
    }
  },

  // 4. 构建配置 - 生产环境禁用 source map，防止源码暴露
  build: {
    sourcemap: false, // 禁用 source map，防止代码被反向工程
    minify: true, // 使用默认压缩方式
    rollupOptions: {
      output: {
        // 输出目录结构，避免浏览器可以直接列出文件
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || 'asset';
          const info = name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|gif|svg/.test(ext)) {
            return `images/[name]-[hash][extname]`;
          } else if (/woff|woff2|eot|ttf|otf/.test(ext)) {
            return `fonts/[name]-[hash][extname]`;
          } else if (ext === 'css') {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    }
  },
  
  // 5. 全局环境变量（替代硬编码，API文件中可直接读取）
  define: {
    // 生产环境地址（若无需代理，可直接用这个地址）
    __API_BASE_URL__: JSON.stringify('http://localhost:8080')
  }
})