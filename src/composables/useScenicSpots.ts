import { ref, onMounted } from 'vue'
import api from '@/api'
import type { ScenicSpot } from '@/api'
import { mockScenicSpotRanking } from '@/mock/data'

export function useScenicSpots() {
  const scenicSpots = ref<ScenicSpot[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchScenicSpots = async () => {
    loading.value = true
    error.value = null
    
    try {
      // 如果开启了 Mock，使用 Mock 数据
      if (import.meta.env.VITE_USE_MOCK === 'true') {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 500))
        scenicSpots.value = mockScenicSpotRanking.data
      } else {
        const response = await api.tourism.getScenicSpotRanking()
        scenicSpots.value = response.data
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取景点数据失败'
      console.error('获取景点数据失败:', err)
    } finally {
      loading.value = false
    }
  }

  const refreshData = () => {
    fetchScenicSpots()
  }

  onMounted(() => {
    fetchScenicSpots()
  })

  return {
    scenicSpots,
    loading,
    error,
    fetchScenicSpots,
    refreshData
  }
}
