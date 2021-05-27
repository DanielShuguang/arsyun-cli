import path from 'path'
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import styleImport from 'vite-plugin-style-import'

import reactRefresh from '@vitejs/plugin-react-refresh'

const url = ''
const isProduction = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? './' : '',
  css: {
    preprocessorOptions: {}
  },
  server: {
    open: true,
    proxy: {
      '/api': {
        target: url,
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'build'
  },
  plugins: [
    reactRefresh(),
    viteCompression(),
    styleImport({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: name => {
            return `antd/es/${name}/style/index.css`
          }
        }
      ]
    })
  ]
})
