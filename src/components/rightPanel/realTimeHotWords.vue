<!-- 今日低碳出行TOP20  -->
<template>
  <CPanel :height="283">
    <template #header>今日低碳出行TOP20</template>
    <template #content>
      <div v-if="showScrollContainer && displayItems.length > 0" class="scroll-container" ref="containerRef">
        <!-- 使用vue3ScrollSeamless组件实现滚动效果 -->
        <vue3ScrollSeamless
          ref="scrollRef"
          :dataList="displayItems"
          :class-option="classOption"
          :key="`scroll-${updateKey}`"
          class="seamless-warp"
        >
          <div class="ranking-list">
            <div
              v-for="(item, index) in displayItems"
              :key="`item-${index}-${item.name}`"
              class="ranking-item"
              :class="{ 'top-three': index < 3 }"
            >
              <div class="ranking-number">{{ String(index + 1).padStart(2, '0') }}</div>
              <div class="user-avatar">
                <img :src="item.avatar" :alt="item.name" />
              </div>
              <div class="user-info">
                <span class="user-name">{{ item.name }}</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: item.percentage + '%' }"></div>
              </div>
              <div class="duration">{{ item.duration }} min</div>
            </div>
          </div>
        </vue3ScrollSeamless>
      </div>
      <div v-else class="no-data">
        <p>{{ isLoading ? '加载中...' : '暂无数据' }}</p>
      </div>
    </template>
  </CPanel>
</template>

<script setup lang="ts">
import { ref, inject, computed, watch, nextTick, onMounted } from 'vue'
import CPanel from '@/components/common/CPanel.vue'
import { vue3ScrollSeamless } from 'vue3-scroll-seamless'
import TouXiang from '@/assets/img/touxiang.png'
const rightPanelData: any = inject('rightPanelData', ref({}))

// 响应式更新key，用于强制重新渲染滚动组件
const updateKey = ref(0)
const isMounted = ref(false)
const isLoading = ref(true)
const showScrollContainer = ref(false)
const containerRef = ref()
const scrollRef = ref()

// 滚动配置
const classOption = computed(() => ({
  step: 0.5,
  limitMoveNum: Math.min(displayItems.value.length, 6),
  hoverStop: true,
  direction: 1,
  openWatch: true,
  singleHeight: 0,
  singleWidth: 0,
  waitTime: 1000
}))

const todayTop20 = computed(() => {
  console.log('rightPanelData changed:', rightPanelData?.value)

  let data = rightPanelData?.value?.todayTop20

  // 如果没有数据或数据无效，使用模拟数据
  if (!data || !Array.isArray(data) || data.length === 0) {
    data = []
  }

  // 如果仍然没有数据，返回空数组
  if (data.length === 0) {
    return []
  }

  // 获取最大持续时间用于计算进度条百分比
  const maxDuration = Math.max(...data.map((item: any) => item.duration || 0))

  const result = data.map((item: any, index: number) => ({
    avatar: item.userImgUrl || TouXiang,
    name: item.userName || `用户${index + 1}`,
    duration: item.duration || 0,
    // 根据持续时间计算进度条百分比，最长的为100%
    percentage: maxDuration > 0 ? ((item.duration || 0) / maxDuration) * 100 : 0
  }))

  return result
})

// 显示的项目（扩展数据以实现无缝滚动）
const displayItems = computed(() => {
  const items = todayTop20.value
  if (items.length === 0) return []

  // 如果数据不足，复制数据以填充滚动效果
  if (items.length < 10) {
    const repeated = []
    const repeatTimes = Math.ceil(10 / items.length)
    for (let i = 0; i < repeatTimes; i++) {
      repeated.push(...items)
    }
    return repeated.slice(0, 10)
  }

  return items
})

// 监听数据变化
watch(
  rightPanelData,
  (newVal, oldVal) => {
    console.log('rightPanelData watch triggered:', newVal)
    isLoading.value = false

    // 只有当 todayTop20 数据真正发生变化时才更新
    if (JSON.stringify(newVal?.todayTop20) !== JSON.stringify(oldVal?.todayTop20)) {
      updateKey.value++

      // 延迟显示滚动容器，确保DOM准备好
      if (newVal?.todayTop20 && newVal.todayTop20.length > 0) {
        // 使用更长的延迟确保DOM完全渲染
        setTimeout(() => {
          showScrollContainer.value = true
        }, 300)
      }
    }
  },
  { deep: true }
)

watch(displayItems, (newVal, oldVal) => {
  console.log('displayItems computed result:', newVal)

  // 只有当数据真正变化时才更新
  if (newVal.length !== oldVal?.length || JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
    updateKey.value++

    // 如果有数据且组件已挂载，延迟显示滚动容器
    if (newVal.length > 0 && isMounted.value) {
      setTimeout(() => {
        showScrollContainer.value = true
      }, 300)
    } else {
      showScrollContainer.value = false
    }
  }
})

onMounted(() => {
  // 确保组件已挂载后再启用滚动
  nextTick(() => {
    isMounted.value = true

    // 如果已经有数据，延迟显示滚动容器
    if (displayItems.value.length > 0) {
      setTimeout(() => {
        showScrollContainer.value = true
      }, 500)
    }

    // 5秒后停止loading状态
    setTimeout(() => {
      isLoading.value = false
      // 如果还没有显示容器且有数据，强制显示
      if (!showScrollContainer.value && displayItems.value.length > 0) {
        showScrollContainer.value = true
      }
    }, 5000)
  })
})
</script>

<style lang="scss" scoped>
::v-deep .panel-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.scroll-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.seamless-warp {
  height: 200px;
  overflow: hidden;
}

.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #666;
  font-size: 14px;
}

.ranking-list {
  position: relative;
  width: 100%;
  padding: 0px 12px;
  box-sizing: border-box;
}

.ranking-item {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
  &:hover {
    background: linear-gradient(90deg, rgba(103, 224, 227, 0.2) 0%, rgba(103, 224, 227, 0.1) 100%);
    transform: translateX(2px);
  }
}
.ranking-number {
  color: #67e0e3;
  font-size: 12px;
  font-weight: 600;
  width: 24px;
  text-align: center;
  margin-right: 12px;
}

.user-avatar {
  width: 24px;
  height: 24px;
  margin-right: 12px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
}

.user-info {
  flex: 1;
  margin-right: 12px;

  .user-name {
    color: #ffffff;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.progress-bar {
  flex: 2;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin-right: 12px;
  overflow: hidden;

  .progress-fill {
    height: 100%;
    background: linear-gradient(270deg, #5cffec 0%, rgba(94, 254, 238, 0) 100%);
    border-radius: 4px;
    transition: width 0.6s ease;
  }
}

.duration {
  color: #67e0e3;
  font-size: 12px;
  font-weight: 600;
  width: 50px;
  text-align: right;
}
</style>
