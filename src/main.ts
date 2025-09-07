import { createApp } from 'vue'
import '@/styles/index.scss'
import App from './page/index.vue'

// 设置应用标题
document.title = import.meta.env.VITE_APP_TITLE || '山东省旅游业智能监控平台'

createApp(App).mount('#app')
