import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import { getProxyConfig } from './src/config/proxy'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  return {
    base: '/daping',
    plugins: [
      vue(), 
      AutoImport({
        imports: [
          'vue',
          'vue-router',
        ],
        resolvers: [VantResolver()],
      }),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    server: {
      port: 5173,
      host: true,
      open: true,
      // 使用动态代理配置
      proxy: isDev ? getProxyConfig(mode) : undefined
    },
    build: {
      // 构建配置
      outDir: 'fly-large-screen',
      sourcemap: false,
      minify: 'terser',
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]'
        }
      }
    }
  }
})
