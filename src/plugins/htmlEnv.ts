import type { Plugin } from 'vite'

/**
 * HTML 环境变量替换插件
 * 在 HTML 中使用 %VITE_VAR_NAME% 语法来替换环境变量
 */
export function htmlEnvPlugin(): Plugin {
  return {
    name: 'html-env',
    transformIndexHtml: {
      enforce: 'pre',
      transform(html, context) {
        // 获取环境变量
        const env = context.server?.config.env || process.env
        
        // 替换 HTML 中的环境变量
        return html.replace(/%(\w+)%/g, (match, key) => {
          const value = env[key]
          if (value !== undefined) {
            return value
          }
          
          // 如果找不到环境变量，保持原样或使用默认值
          console.warn(`Environment variable ${key} not found`)
          return match
        })
      }
    }
  }
}
