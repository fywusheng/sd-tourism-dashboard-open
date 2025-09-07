<!-- 代理测试组件 -->
<template>
  <div class="proxy-test">
    <h3>🔧 代理测试工具</h3>

    <div class="test-section">
      <h4>API 代理测试</h4>

      <!-- 测试按钮组 -->
      <div class="button-group">
        <button @click="testMainApi" :disabled="loading">测试主 API (/api)</button>
        <button @click="testTourismApi" :disabled="loading">测试旅游 API (/tourism-api)</button>
        <button @click="testAuthApi" :disabled="loading">测试认证 API (/auth)</button>
        <button @click="testUploadApi" :disabled="loading">测试上传 API (/upload)</button>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading">🔄 正在测试代理连接...</div>

      <!-- 测试结果 -->
      <div v-if="testResults.length > 0" class="results">
        <h5>测试结果:</h5>
        <div v-for="(result, index) in testResults" :key="index" class="result-item">
          <div class="result-header">
            <span class="method">{{ result.method }}</span>
            <span class="url">{{ result.url }}</span>
            <span class="status" :class="result.success ? 'success' : 'error'">
              {{ result.success ? '✅ 成功' : '❌ 失败' }}
            </span>
          </div>
          <div class="result-body">
            <div class="time">⏱️ 响应时间: {{ result.time }}ms</div>
            <div class="details">
              <strong>详情:</strong>
              <pre>{{ JSON.stringify(result.data, null, 2) }}</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- 清除结果 -->
      <button v-if="testResults.length > 0" @click="clearResults" class="clear-btn">清除结果</button>
    </div>

    <!-- 代理配置信息 -->
    <div class="config-section">
      <h4>📋 当前代理配置</h4>
      <div class="config-list">
        <div class="config-item"><strong>/api</strong> → http://localhost:3000</div>
        <div class="config-item"><strong>/tourism-api</strong> → http://localhost:8080/api/v1</div>
        <div class="config-item"><strong>/auth</strong> → http://localhost:3001/api/auth</div>
        <div class="config-item"><strong>/upload</strong> → http://localhost:3002/api/upload</div>
        <div class="config-item"><strong>/ws</strong> → ws://localhost:3000 (WebSocket)</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface TestResult {
  method: string
  url: string
  success: boolean
  time: number
  data: any
}

const loading = ref(false)
const testResults = ref<TestResult[]>([])

// 通用测试函数
const testProxy = async (method: string, url: string, data?: any) => {
  const startTime = Date.now()

  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (data && method !== 'GET') {
      options.body = JSON.stringify(data)
    }

    const response = await fetch(url, options)
    const responseData = await response.json().catch(() => ({
      status: response.status,
      statusText: response.statusText
    }))

    const endTime = Date.now()

    testResults.value.unshift({
      method,
      url,
      success: response.ok,
      time: endTime - startTime,
      data: {
        status: response.status,
        statusText: response.statusText,
        response: responseData
      }
    })
  } catch (error) {
    const endTime = Date.now()

    testResults.value.unshift({
      method,
      url,
      success: false,
      time: endTime - startTime,
      data: {
        error: error instanceof Error ? error.message : '未知错误',
        type: 'NetworkError'
      }
    })
  }
}

// 测试主 API
const testMainApi = async () => {
  loading.value = true
  try {
    await testProxy('GET', '/api/health')
    await testProxy('POST', '/api/test', { message: 'Hello from proxy test' })
  } finally {
    loading.value = false
  }
}

// 测试旅游 API
const testTourismApi = async () => {
  loading.value = true
  try {
    await testProxy('GET', '/tourism-api/stats')
    await testProxy('GET', '/tourism-api/scenic-spots')
  } finally {
    loading.value = false
  }
}

// 测试认证 API
const testAuthApi = async () => {
  loading.value = true
  try {
    await testProxy('POST', '/auth/login', {
      username: 'test',
      password: 'test123'
    })
    await testProxy('GET', '/auth/profile')
  } finally {
    loading.value = false
  }
}

// 测试上传 API
const testUploadApi = async () => {
  loading.value = true
  try {
    await testProxy('GET', '/upload/config')
    // 注意: 这里只是测试连接，实际文件上传需要 FormData
    await testProxy('POST', '/upload/test', {
      filename: 'test.jpg',
      size: 1024
    })
  } finally {
    loading.value = false
  }
}

// 清除测试结果
const clearResults = () => {
  testResults.value = []
}
</script>

<style lang="scss" scoped>
.proxy-test {
  padding: 24px;
  max-width: 1000px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  h3 {
    color: #2d3748;
    margin-bottom: 24px;
    font-size: 24px;
  }

  h4 {
    color: #4a5568;
    margin-bottom: 16px;
    font-size: 18px;
  }

  h5 {
    color: #718096;
    margin-bottom: 12px;
    font-size: 16px;
  }
}

.test-section {
  background: #f7fafc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 24px;
  border: 1px solid #e2e8f0;
}

.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;

  button {
    padding: 10px 16px;
    background: #4299e1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      background: #3182ce;
      transform: translateY(-1px);
    }

    &:disabled {
      background: #a0aec0;
      cursor: not-allowed;
      transform: none;
    }
  }
}

.loading {
  color: #4299e1;
  font-weight: 500;
  text-align: center;
  padding: 16px;
  background: #ebf8ff;
  border-radius: 6px;
  margin-bottom: 16px;
}

.results {
  background: white;
  border-radius: 6px;
  padding: 16px;
  border: 1px solid #e2e8f0;
}

.result-item {
  border-bottom: 1px solid #e2e8f0;
  padding: 12px 0;

  &:last-child {
    border-bottom: none;
  }
}

.result-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;

  .method {
    background: #4a5568;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    min-width: 50px;
    text-align: center;
  }

  .url {
    font-family: 'Courier New', monospace;
    color: #2d3748;
    font-weight: 500;
  }

  .status {
    margin-left: auto;
    font-weight: 500;

    &.success {
      color: #38a169;
    }

    &.error {
      color: #e53e3e;
    }
  }
}

.result-body {
  .time {
    color: #718096;
    font-size: 14px;
    margin-bottom: 8px;
  }

  .details {
    pre {
      background: #f7fafc;
      padding: 8px;
      border-radius: 4px;
      font-size: 12px;
      overflow-x: auto;
      margin: 8px 0 0 0;
      color: #2d3748;
      border: 1px solid #e2e8f0;
    }
  }
}

.clear-btn {
  background: #e53e3e !important;
  margin-top: 16px;

  &:hover:not(:disabled) {
    background: #c53030 !important;
  }
}

.config-section {
  background: #edf2f7;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.config-list {
  display: grid;
  gap: 8px;
}

.config-item {
  background: white;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  font-family: 'Courier New', monospace;

  strong {
    color: #4299e1;
    margin-right: 12px;
  }
}

@media (max-width: 768px) {
  .proxy-test {
    padding: 16px;
  }

  .button-group {
    flex-direction: column;

    button {
      width: 100%;
    }
  }

  .result-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;

    .status {
      margin-left: 0;
    }
  }
}
</style>
