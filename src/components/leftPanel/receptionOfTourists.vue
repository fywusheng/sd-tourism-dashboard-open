<!-- 本月各省销售概况 -->
<template>
  <CPanel :height="283">
    <template #header>本月各省销售概况</template>
    <template #content>
      <SaleList :data="customData" title="全国各省销售排行" unit="台" :height="180" />
    </template>
  </CPanel>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CPanel from '@/components/common/CPanel.vue'
import SaleList from '@/components/common/SaleList.vue'

// 先写死数据，按value倒序排列
const customData = ref([
  {
    name: '陕西',
    value: 9795
  },
  {
    name: '山东',
    value: 6754
  },
  {
    name: '河北',
    value: 5622
  },
  {
    name: '河南',
    value: 4176
  },
  {
    name: '广东',
    value: 3867
  },
  {
    name: '湖北',
    value: 3364
  },
  {
    name: '山西',
    value: 2605
  },
  {
    name: '江苏',
    value: 2002
  },
  {
    name: '辽宁',
    value: 1706
  },
  {
    name: '四川',
    value: 1638
  },
  {
    name: '浙江',
    value: 1569
  },
  {
    name: '湖南',
    value: 1510
  },
  {
    name: '天津',
    value: 1300
  },
  {
    name: '上海',
    value: 1131
  },
  {
    name: '新疆',
    value: 1046
  },
  {
    name: '福建',
    value: 914
  },
  {
    name: '重庆',
    value: 798
  },
  {
    name: '安徽',
    value: 742
  },
  {
    name: '黑龙江',
    value: 673
  },
  {
    name: '江西',
    value: 642
  },
  {
    name: '广西',
    value: 629
  },
  {
    name: '吉林',
    value: 603
  },
  {
    name: '甘肃',
    value: 431
  },
  {
    name: '贵州',
    value: 376
  },
  {
    name: '云南',
    value: 371
  },
  {
    name: '内蒙古',
    value: 348
  },
  {
    name: '西藏',
    value: 260
  },
  {
    name: '宁夏',
    value: 61
  },
  {
    name: '青海',
    value: 55
  },
  {
    name: '北京',
    value: 1
  },
  {
    name: '海南',
    value: 1
  }
])

// const customData = computed(() => {
//   return citySalesData.value
//     ? citySalesData.value.map((item: any) => {
//         return {
//           name: item.province,
//           value: item.soldCount
//         }
//       })
//     : []
// })

onMounted(() => {
  // option.value = createEchartLine()
})
</script>
<style lang="scss" scoped></style>
