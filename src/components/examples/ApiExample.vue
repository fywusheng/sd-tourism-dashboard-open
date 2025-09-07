<!-- API 使用示例组件 -->
<template>
  <div class="api-example">
    <h3>API 请求示例</h3>

    <!-- 旅游统计数据 -->
    <div class="stats-section">
      <h4>旅游统计数据</h4>
      <div v-if="statsLoading">加载中...</div>
      <div v-else-if="statsError" class="error">{{ statsError }}</div>
      <div v-else class="stats">
        <p>总收入: {{ stats.totalRevenue }} 万元</p>
        <p>总游客数: {{ stats.totalVisitors }} 万人</p>
        <p>总支出: {{ stats.totalExpenditure }} 万元</p>
      </div>
      <button @click="refreshStats">刷新统计数据</button>
    </div>

    <!-- 景点排行 -->
    <div class="scenic-section">
      <h4>景点排行榜</h4>
      <div v-if="scenicLoading">加载中...</div>
      <div v-else-if="scenicError" class="error">{{ scenicError }}</div>
      <div v-else>
        <div v-for="spot in scenicSpots" :key="spot.id" class="spot-item">
          <span>{{ spot.name }}</span>
          <span>{{ spot.location }}</span>
          <span>{{ spot.visitors }} 人</span>
          <span>评分: {{ spot.rating }}</span>
        </div>
      </div>
      <button @click="refreshScenicSpots">刷新景点数据</button>
    </div>

    <!-- 手动 API 调用示例 -->
    <div class="manual-section">
      <h4>手动 API 调用</h4>
      <button @click="testApi">测试 API 调用</button>
      <div v-if="testResult" class="test-result">
        <pre>{{ JSON.stringify(testResult, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTourismStats } from '@/composables/useTourismStats'
import { useScenicSpots } from '@/composables/useScenicSpots'
import api from '@/api'

// 使用 Composables
const { stats, loading: statsLoading, error: statsError, refreshStats } = useTourismStats()

const { scenicSpots, loading: scenicLoading, error: scenicError, refreshData: refreshScenicSpots } = useScenicSpots()

// 手动测试 API
const testResult = ref<any>(null)

const testApi = async () => {
  try {
    // 测试获取热词数据
    const response = await api.tourism.getHotWords()
    testResult.value = response
  } catch (error) {
    testResult.value = { error: error instanceof Error ? error.message : '请求失败' }
  }
}
</script>

<style lang="scss" scoped>
.api-example {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  h3,
  h4 {
    color: #333;
    margin-bottom: 16px;
  }

  .stats-section,
  .scenic-section,
  .manual-section {
    margin-bottom: 32px;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f9f9f9;
  }

  .stats {
    p {
      margin: 8px 0;
      font-size: 16px;
    }
  }

  .spot-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }

  .error {
    color: #f56565;
    font-weight: bold;
  }

  button {
    padding: 8px 16px;
    background: #4299e1;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 12px;

    &:hover {
      background: #3182ce;
    }
  }

  .test-result {
    margin-top: 16px;
    background: #f7fafc;
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #e2e8f0;

    pre {
      margin: 0;
      font-size: 12px;
      overflow-x: auto;
    }
  }
}
</style>
