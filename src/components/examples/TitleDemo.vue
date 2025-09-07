<!-- 应用标题演示组件 -->
<template>
  <div class="title-demo">
    <h3>🏷️ 应用标题管理演示</h3>

    <!-- 当前标题显示 -->
    <div class="current-title">
      <h4>当前标题信息</h4>
      <div class="title-info">
        <div class="info-item">
          <strong>页面标题:</strong>
          <span class="title-value">{{ currentTitle }}</span>
        </div>
        <div class="info-item">
          <strong>应用名称:</strong>
          <span class="title-value">{{ appTitle }}</span>
        </div>
        <div class="info-item">
          <strong>应用版本:</strong>
          <span class="title-value">{{ appVersion }}</span>
        </div>
        <div class="info-item">
          <strong>构建时间:</strong>
          <span class="title-value">{{ buildTime }}</span>
        </div>
      </div>
    </div>

    <!-- 标题设置工具 -->
    <div class="title-controls">
      <h4>标题设置工具</h4>

      <div class="control-group">
        <input v-model="newTitle" placeholder="输入新的页面标题" class="title-input" />
        <div class="checkbox-group">
          <label>
            <input v-model="addSuffix" type="checkbox" />
            添加应用名称后缀
          </label>
        </div>
        <div class="button-group">
          <button @click="updateTitle" class="btn-primary">设置标题</button>
          <button @click="resetTitle" class="btn-secondary">重置标题</button>
        </div>
      </div>
    </div>

    <!-- 预设标题 -->
    <div class="preset-titles">
      <h4>快速设置</h4>
      <div class="preset-buttons">
        <button v-for="preset in presetTitles" :key="preset.title" @click="setPresetTitle(preset)" class="preset-btn">
          {{ preset.label }}
        </button>
      </div>
    </div>

    <!-- 环境变量信息 -->
    <div class="env-info">
      <h4>🌍 环境变量信息</h4>
      <div class="env-list">
        <div class="env-item" v-for="(value, key) in envVars" :key="key">
          <strong>{{ key }}:</strong>
          <span>{{ value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAppTitle, PageTitleManager } from '@/composables/useAppTitle'

// 使用标题管理功能
useAppTitle() // 自动设置标题

// 响应式数据
const currentTitle = ref('')
const newTitle = ref('')
const addSuffix = ref(true)

// 计算属性
const appTitle = computed(() => import.meta.env.VITE_APP_TITLE)
const appVersion = computed(() => {
  try {
    return __APP_VERSION__
  } catch {
    return 'unknown'
  }
})
const buildTime = computed(() => {
  try {
    return new Date(__BUILD_TIME__).toLocaleString('zh-CN')
  } catch {
    return 'unknown'
  }
})

// 环境变量
const envVars = computed(() => ({
  'VITE_APP_TITLE': import.meta.env.VITE_APP_TITLE,
  'VITE_NODE_ENV': import.meta.env.VITE_NODE_ENV,
  'VITE_API_BASE_URL': import.meta.env.VITE_API_BASE_URL,
  'VITE_USE_MOCK': import.meta.env.VITE_USE_MOCK
}))

// 预设标题
const presetTitles = [
  { label: '数据监控', title: '数据监控' },
  { label: '景点管理', title: '景点管理' },
  { label: '游客分析', title: '游客分析' },
  { label: '系统设置', title: '系统设置' }
]

// 更新当前标题显示
const updateCurrentTitle = () => {
  currentTitle.value = document.title
}

// 设置标题
const updateTitle = () => {
  if (!newTitle.value.trim()) return

  if (addSuffix.value) {
    PageTitleManager.setTitle(newTitle.value, true)
  } else {
    PageTitleManager.setTitle(newTitle.value, false)
  }

  updateCurrentTitle()
  newTitle.value = ''
}

// 重置标题
const resetTitle = () => {
  PageTitleManager.resetTitle()
  updateCurrentTitle()
}

// 设置预设标题
const setPresetTitle = (preset: any) => {
  PageTitleManager.setTitle(preset.title)
  updateCurrentTitle()
}

// 组件挂载时更新标题显示
onMounted(() => {
  updateCurrentTitle()

  // 监听标题变化
  const observer = new MutationObserver(() => {
    updateCurrentTitle()
  })

  observer.observe(document.querySelector('title')!, {
    childList: true,
    characterData: true,
    subtree: true
  })
})
</script>

<style lang="scss" scoped>
.title-demo {
  padding: 24px;
  max-width: 800px;
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
}

.current-title,
.title-controls,
.preset-titles,
.env-info {
  background: #f7fafc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #e2e8f0;
}

.title-info {
  display: grid;
  gap: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;

  strong {
    min-width: 100px;
    color: #4a5568;
  }

  .title-value {
    color: #2d3748;
    font-family: 'Courier New', monospace;
    background: #edf2f7;
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #e2e8f0;
  }
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.title-input {
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }
}

.checkbox-group {
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    input[type='checkbox'] {
      margin: 0;
    }
  }
}

.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary,
.preset-btn {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background: #4299e1;
  color: white;

  &:hover {
    background: #3182ce;
  }
}

.btn-secondary {
  background: #e2e8f0;
  color: #4a5568;

  &:hover {
    background: #cbd5e0;
  }
}

.preset-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.preset-btn {
  background: #edf2f7;
  color: #4a5568;
  font-size: 14px;

  &:hover {
    background: #e2e8f0;
    transform: translateY(-1px);
  }
}

.env-list {
  display: grid;
  gap: 8px;
}

.env-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: white;
  border-radius: 4px;
  border: 1px solid #e2e8f0;

  strong {
    min-width: 200px;
    color: #4299e1;
    font-family: 'Courier New', monospace;
  }

  span {
    color: #2d3748;
    font-family: 'Courier New', monospace;
  }
}

@media (max-width: 768px) {
  .title-demo {
    padding: 16px;
  }

  .button-group,
  .preset-buttons {
    flex-direction: column;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>
