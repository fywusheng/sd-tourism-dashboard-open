<template>
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
const topTenData = ref([]) // 京东电动车销量TOP10
provide('topTenData', topTenData)

onMounted(() => {
  autofit.init({
    el: 'body',
    dh: 768, // 设计稿高度
    dw: 1920, // 设计稿宽度
    resize: true
  })

  getAnnualData()
})

// 获取年度统计数据
async function getAnnualData() {
  const res = await http.get('/api/device/dashboard/overview')
  console.log('年度数据:', res)
  // 京东电动车销量TOP10
  topTenData.value = res.data.topTenData
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
</style>
