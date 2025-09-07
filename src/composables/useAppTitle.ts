import { onMounted } from 'vue'

/**
 * 使用应用标题的组合式函数
 * 从环境变量中获取标题并设置到 document.title
 */
export function useAppTitle() {
  const setTitle = (title?: string) => {
    const appTitle = title || import.meta.env.VITE_APP_TITLE || '山东省旅游业智能监控平台'
    document.title = appTitle
    
    // 同时更新 meta 标签
    let metaTitle = document.querySelector('meta[property="og:title"]')
    if (!metaTitle) {
      metaTitle = document.createElement('meta')
      metaTitle.setAttribute('property', 'og:title')
      document.head.appendChild(metaTitle)
    }
    metaTitle.setAttribute('content', appTitle)
    
    // 更新 Twitter 标题
    let twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta')
      twitterTitle.setAttribute('name', 'twitter:title')
      document.head.appendChild(twitterTitle)
    }
    twitterTitle.setAttribute('content', appTitle)
  }

  // 组件挂载时自动设置标题
  onMounted(() => {
    setTitle()
  })

  return {
    setTitle
  }
}

/**
 * 页面标题管理工具
 */
export class PageTitleManager {
  private static baseTitle = import.meta.env.VITE_APP_TITLE || '山东省旅游业智能监控平台'
  
  /**
   * 设置页面标题
   * @param title 页面标题
   * @param suffix 是否添加应用名称后缀
   */
  static setTitle(title: string, suffix: boolean = true) {
    if (suffix) {
      document.title = `${title} - ${this.baseTitle}`
    } else {
      document.title = title
    }
  }
  
  /**
   * 重置为默认标题
   */
  static resetTitle() {
    document.title = this.baseTitle
  }
  
  /**
   * 获取当前应用标题
   */
  static getBaseTitle() {
    return this.baseTitle
  }
}
