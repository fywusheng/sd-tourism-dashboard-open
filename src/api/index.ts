import http from '@/utils/http'
import type { ApiResponse } from '@/utils/http'

// 用户相关接口
export interface User {
  id: number
  username: string
  email: string
  avatar?: string
  createTime: string
}

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

// 旅游数据接口
export interface TourismData {
  id: number
  name: string
  value: number
  percentage: number
  trend: 'up' | 'down'
  location?: {
    lng: number
    lat: number
  }
}

export interface ScenicSpot {
  id: number
  name: string
  location: string
  visitors: number
  rating: number
  imageUrl?: string
}

// 用户相关 API
export const userApi = {
  // 登录
  login: (params: LoginParams): Promise<ApiResponse<LoginResponse>> => {
    return http.post('/auth/login', params)
  },

  // 获取用户信息
  getUserInfo: (): Promise<ApiResponse<User>> => {
    return http.get('/user/info')
  },

  // 登出
  logout: (): Promise<ApiResponse<null>> => {
    return http.post('/auth/logout')
  }
}

// 旅游数据相关 API
export const tourismApi = {
  // 获取旅游统计数据
  getTourismStats: (): Promise<ApiResponse<{
    totalRevenue: number
    totalVisitors: number
    totalExpenditure: number
  }>> => {
    return http.get('/tourism/stats')
  },

  // 获取景点排行
  getScenicSpotRanking: (): Promise<ApiResponse<ScenicSpot[]>> => {
    return http.get('/tourism/scenic-spots/ranking')
  },

  // 获取游客数据
  getTouristData: (): Promise<ApiResponse<TourismData[]>> => {
    return http.get('/tourism/tourists')
  },

  // 获取年龄分布数据
  getAgeDistribution: (): Promise<ApiResponse<{
    age: string
    count: number
    percentage: number
  }[]>> => {
    return http.get('/tourism/age-distribution')
  },

  // 获取实时热词
  getHotWords: (): Promise<ApiResponse<{
    word: string
    count: number
    trend: 'up' | 'down' | 'stable'
  }[]>> => {
    return http.get('/tourism/hot-words')
  },

  // 获取地图数据
  getMapData: (): Promise<ApiResponse<{
    regions: Array<{
      name: string
      value: number
      coordinates: [number, number]
    }>
    connections: Array<{
      from: [number, number]
      to: [number, number]
      value: number
    }>
  }>> => {
    return http.get('/tourism/map-data')
  },

  // 获取车辆使用数据
  getVehicleUsage: (): Promise<ApiResponse<{
    cities: string[]
    data: Array<{
      city: string
      duration: number
      usage: number
    }>
  }>> => {
    return http.get('/tourism/vehicle-usage')
  },

  // 获取行业收入数据
  getIndustryRevenue: (): Promise<ApiResponse<{
    runtime1: number
    runtime2: number
    maxRuntime: number
  }>> => {
    return http.get('/tourism/industry-revenue')
  }
}

// 系统配置相关 API
export const systemApi = {
  // 获取系统配置
  getConfig: (): Promise<ApiResponse<{
    title: string
    theme: string
    refreshInterval: number
  }>> => {
    return http.get('/system/config')
  },

  // 更新系统配置
  updateConfig: (config: any): Promise<ApiResponse<null>> => {
    return http.put('/system/config', config)
  }
}

// 文件上传相关 API
export const fileApi = {
  // 上传图片
  uploadImage: (file: File): Promise<ApiResponse<{
    url: string
    filename: string
    size: number
  }>> => {
    return http.upload('/upload/image', file)
  },

  // 上传文件
  uploadFile: (file: File): Promise<ApiResponse<{
    url: string
    filename: string
    size: number
  }>> => {
    return http.upload('/upload/file', file)
  }
}

// 导出所有 API
export default {
  user: userApi,
  tourism: tourismApi,
  system: systemApi,
  file: fileApi
}
