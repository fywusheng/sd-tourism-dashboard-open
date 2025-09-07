import axios from 'axios'
import type { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  InternalAxiosRequestConfig 
} from 'axios'

// 响应数据接口
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
}

// 请求配置接口
export interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  showError?: boolean
}

class HttpRequest {
  private instance: AxiosInstance
  private baseConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config))
    this.setupInterceptors()
  }

  // 设置拦截器
  private setupInterceptors(): void {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 在请求发送之前做一些处理
        const token = localStorage.getItem('token')
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // 显示加载状态
        const requestConfig = config as RequestConfig
        if (requestConfig.showLoading !== false) {
          // 这里可以添加全局 loading 显示逻辑
          console.log('Loading started...')
        }

        return config
      },
      (error) => {
        console.error('Request error:', error)
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        // 隐藏加载状态
        console.log('Loading finished...')

        const { data } = response
        
        // 根据业务状态码处理
        if (data.code === 200 || data.success) {
          return response
        } else {
          // 业务错误处理
          console.error('Business error:', data.message)
          return Promise.reject(new Error(data.message || '请求失败'))
        }
      },
      (error) => {
        // 隐藏加载状态
        console.log('Loading finished...')

        // HTTP 错误处理
        let message = '网络错误'
        
        if (error.response) {
          const { status, data } = error.response
          switch (status) {
            case 401:
              message = '未授权，请重新登录'
              // 可以在这里处理登录过期
              localStorage.removeItem('token')
              // window.location.href = '/login'
              break
            case 403:
              message = '拒绝访问'
              break
            case 404:
              message = '请求地址出错'
              break
            case 408:
              message = '请求超时'
              break
            case 500:
              message = '服务器内部错误'
              break
            case 501:
              message = '服务未实现'
              break
            case 502:
              message = '网关错误'
              break
            case 503:
              message = '服务不可用'
              break
            case 504:
              message = '网关超时'
              break
            case 505:
              message = 'HTTP版本不受支持'
              break
            default:
              message = data?.message || `连接错误${status}`
          }
        } else if (error.request) {
          message = '网络连接异常'
        }

        console.error('Response error:', message)
        
        // 显示错误信息
        const requestConfig = error.config as RequestConfig
        if (requestConfig?.showError !== false) {
          // 这里可以添加全局错误提示逻辑
          console.error('Error message:', message)
        }

        return Promise.reject(error)
      }
    )
  }

  // GET 请求
  public get<T = any>(
    url: string, 
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.instance.get(url, config).then(res => res.data)
  }

  // POST 请求
  public post<T = any>(
    url: string, 
    data?: any, 
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.instance.post(url, data, config).then(res => res.data)
  }

  // PUT 请求
  public put<T = any>(
    url: string, 
    data?: any, 
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.instance.put(url, data, config).then(res => res.data)
  }

  // DELETE 请求
  public delete<T = any>(
    url: string, 
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.instance.delete(url, config).then(res => res.data)
  }

  // PATCH 请求
  public patch<T = any>(
    url: string, 
    data?: any, 
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.instance.patch(url, data, config).then(res => res.data)
  }

  // 上传文件
  public upload<T = any>(
    url: string, 
    file: File | FormData, 
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const formData = file instanceof FormData ? file : new FormData()
    if (file instanceof File) {
      formData.append('file', file)
    }

    return this.instance.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers
      }
    }).then(res => res.data)
  }

  // 下载文件
  public download(
    url: string, 
    filename?: string, 
    config?: RequestConfig
  ): Promise<void> {
    return this.instance.get(url, {
      ...config,
      responseType: 'blob'
    }).then(response => {
      const blob = new Blob([response.data])
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename || 'download'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    })
  }

  // 取消请求
  public cancelRequest(message?: string): void {
    // 这里可以实现请求取消逻辑
    console.log('Request cancelled:', message)
  }
}

// 创建实例
const http = new HttpRequest()

export default http
