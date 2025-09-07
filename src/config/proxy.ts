import type { ProxyOptions } from 'vite'

// 代理配置类型
interface ProxyConfig {
  [key: string]: string | ProxyOptions
}

// 开发环境代理配置
export const devProxyConfig: ProxyConfig = {
  // 主 API 代理
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
    configure: (proxy, options) => {
      proxy.on('proxyReq', (proxyReq, req) => {
        console.log('Proxy request:', req.method, req.url, '->', options.target + proxyReq.path)
      })
      proxy.on('proxyRes', (proxyRes, req) => {
        console.log('Proxy response:', proxyRes.statusCode, req.url)
      })
      proxy.on('error', (err) => {
        console.error('Proxy error:', err)
      })
    }
  },
  
  // 旅游数据专用 API
  '/tourism-api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/tourism-api/, '/api/v1'),
    timeout: 10000
  },
  
  // 用户认证 API
  '/auth': {
    target: 'http://localhost:3001',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/auth/, '/api/auth')
  },
  
  // 文件上传服务
  '/upload': {
    target: 'http://localhost:3002',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/upload/, '/api/upload')
  },
  
  // 静态资源代理 (如果需要)
  '/static': {
    target: 'http://localhost:3000',
    changeOrigin: true
  },
  
  // WebSocket 代理
  '/ws': {
    target: 'ws://localhost:3000',
    ws: true,
    changeOrigin: true
  },
  
  // Socket.IO 代理 (如果使用 Socket.IO)
  '/socket.io': {
    target: 'http://localhost:3000',
    changeOrigin: true,
    ws: true
  }
}

// 测试环境代理配置
export const testProxyConfig: ProxyConfig = {
  '/api': {
    target: 'http://test-api.example.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '/api/v1')
  }
}

// 根据环境获取代理配置
export function getProxyConfig(env: string): ProxyConfig {
  switch (env) {
    case 'development':
      return devProxyConfig
    case 'test':
      return testProxyConfig
    default:
      return {}
  }
}
