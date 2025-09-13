<template>
  <transition name="fade">
    <CLoading v-if="isLoading" />
  </transition>
  <main class="container">
    <!-- 顶部标题 -->
    <CHeader />
    <!-- 地图部分 -->
    <CMap />
    <!-- 左侧数据面板 -->
    <LeftPanel />
    <!-- 右侧数据面板 -->
    <RightPanel />
    <!-- 底部组件 -->
    <CFooter />
    <!-- 中间内容区域 -->
    <MiddleCont />
    <MiddleCardLeftTop />
    <MiddleCardLeftBottom />
    <MiddleCardRightTop />
    <MiddleCardRightBottom />
  </main>
</template>

<script setup lang="ts">
import CLoading from '@/components/common/CLoading.vue'
import CHeader from '@/components/CHeader.vue'
import CMap from '@/components/CMap.vue'
import LeftPanel from '@/components/leftPanel.vue'
import RightPanel from '@/components/rightPanel.vue'
import CFooter from '@/components/CFooter.vue'
import MiddleCont from '@/components/MiddleCont.vue'
import MiddleCardLeftTop from '@/components/MiddleCardLeftTop.vue'
import MiddleCardLeftBottom from '@/components/MiddleCardLeftBottom.vue'
import MiddleCardRightTop from '@/components/MiddleCardRightTop.vue'
import MiddleCardRightBottom from '@/components/MiddleCardRightBottom.vue'
import { onMounted, provide, ref } from 'vue'
import autofit from 'autofit.js'
import http from '@/utils/http'
const isLoading = ref(true)
const topTenData = ref([]) // 京东电动车销量TOP10
const citySalesData = ref([]) // 本月各省销售数据
const latestReviews = ref([]) // 用户评价

const rightPanelData = ref({}) // 右侧数据面板数据
const corePanelData = ref({}) // 核心数据面板数据

provide('topTenData', topTenData)
provide('citySalesData', citySalesData)
provide('latestReviews', latestReviews)
provide('rightPanelData', rightPanelData)
provide('corePanelData', corePanelData)

onMounted(() => {
  autofit.init({
    el: 'body',
    dh: 768, // 设计稿高度
    dw: 1920, // 设计稿宽度
    resize: true
  })

  // 首次加载
  getPageData()

  // 五分钟刷新一次数据
  setInterval(() => {
    // 后续刷新，不再显示 loading
    getAnnualData()
    getRightPanelData()
    getCorePanelData()
  }, 300000) // 300000毫秒 = 5分钟
})

async function getPageData() {
  isLoading.value = true
  try {
    await Promise.all([getAnnualData(), getRightPanelData(), getCorePanelData()])
  } catch (error) {
    console.error('获取页面数据失败:', error)
  } finally {
    isLoading.value = false
  }
}

// 获取年度统计数据
async function getAnnualData() {
  const res = await http.get('/device/dashboard/overview')
  // 京东电动车销量TOP10
  topTenData.value = res.data.hotBrandData.items
  // 本月各省销售数据
  citySalesData.value = res.data.citySalesData
  // 用户评价
  latestReviews.value = res.data.latestReviews
}

// 获取右侧面板数据
async function getRightPanelData() {
  try {
    const res = await http.get('/device/low-carbon-dashboard/complete')
    // 设置右侧面板数据
    rightPanelData.value = res.data
  } catch (error) {
    console.error('Failed to get right panel data:', error)
  }
}

// 获取右侧面板数据
async function getCorePanelData() {
  const res = await http.get('/device/low-carbon-dashboard/core-data')
  // 设置核心面板数据
  corePanelData.value = res.data
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('@/assets/img/bg.png') no-repeat center center;
  background-size: 100% 100%;
}
/* 过渡动画 */
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-leave-to {
  opacity: 0;
}
</style>
