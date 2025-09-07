import { ref, onMounted } from 'vue'
import api from '@/api'
import { mockTourismStats } from '@/mock/data'

export function useTourismStats() {
  const stats = ref({
    totalRevenue: 0,
    totalVisitors: 0,
    totalExpenditure: 0
  })
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchStats = async () => {
    loading.value = true
    error.value = null
    
    try {
      if (import.meta.env.VITE_USE_MOCK === 'true') {
        await new Promise(resolve => setTimeout(resolve, 300))
        stats.value = mockTourismStats.data
      } else {
        const response = await api.tourism.getTourismStats()
        stats.value = response.data
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取统计数据失败'
      console.error('获取统计数据失败:', err)
    } finally {
      loading.value = false
    }
  }

  const refreshStats = () => {
    fetchStats()
  }

  onMounted(() => {
    fetchStats()
  })

  return {
    stats,
    loading,
    error,
    fetchStats,
    refreshStats
  }
}
