<!-- 本月各省销售概况 -->
<template>
  <CPanel :height="283">
    <template #header>本月各省销售概况</template>
    <template #content>
      <SaleList :data="customData" title="自定义省份排行" unit="万台" :height="180" />
      <!-- <SaleList :data="customData" title="自定义标题" unit="万台" :height="350" /> -->
    </template>
  </CPanel>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CPanel from '@/components/common/CPanel.vue'
import SaleList from '@/components/common/SaleList.vue'
// 自定义数据示例
const customData = ref([
  { name: '江苏', value: 65.3 },
  { name: '浙江', value: 58.9 },
  { name: '山东', value: 45.2 },
  { name: '四川', value: 32.1 },
  { name: '湖北', value: 28.6 }
])
onMounted(() => {
  // option.value = createEchartLine()
})
</script>
<style lang="scss" scoped></style>
