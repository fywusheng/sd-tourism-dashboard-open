/// <reference types="vite/client" />

// 扩展 ImportMetaEnv 接口
interface ImportMetaEnv {
  readonly VITE_NODE_ENV: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_TOURISM_API_BASE_URL: string
  readonly VITE_UPLOAD_BASE_URL: string
  readonly VITE_USE_MOCK: string
  readonly VITE_APP_TITLE: string
  readonly VITE_BACKEND_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 全局常量声明
declare const __APP_TITLE__: string
declare const __APP_VERSION__: string
declare const __BUILD_TIME__: string
