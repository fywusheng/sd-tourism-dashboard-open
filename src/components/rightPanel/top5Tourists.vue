<!-- 车辆使用时长 -->
<template>
  <CPanel :height="183">
    <template #header>车辆使用时长</template>
    <template #content>
      <div class="chart-wrapper">
        <div class="chart-title">省排行榜</div>
        <div class="chart-content">
          <CEcharts ref="chartRef" :option="option" @onload="startHighlightLoop" />
        </div>
      </div>
    </template>
  </CPanel>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject, computed, watch } from 'vue'
import CPanel from '@/components/common/CPanel.vue'
import CEcharts from '@/components/common/CEcharts.vue'

const option = ref<any>({})
const chartRef = ref()
let highlightTimer: any = null
const rightPanelData: any = inject('rightPanelData', ref({}))
// 省排行榜
const provincialRanking = computed(() => {
  // return rightPanelData?.value?.provincialRanking || []
  // provincialRanking.value .push({
  //   province: '陕西',
  //   usageDuration: 1622494
  // })
  return [
    { province: '陕西', usageDuration: 1622494 },
    { province: '山东', usageDuration: 1221323 },
    { province: '河北', usageDuration: 1102323 },
    { province: '河南', usageDuration: 900000 },
    { province: '广东', usageDuration: 850000 },
    { province: '湖北', usageDuration: 800000 },
    { province: '山西', usageDuration: 700000 },
    { province: '江苏', usageDuration: 600000 },
    { province: '辽宁', usageDuration: 500000 },
    { province: '四川', usageDuration: 400000 },
    { province: '浙江', usageDuration: 300000 },
    { province: '湖南', usageDuration: 200000 }
  ]
})
watch(provincialRanking, newVal => {
  console.log('provincialRanking changed:', newVal)
  option.value = createEchartBar()
})

// 省份名称数组
const cities = computed(() => {
  const cities: any = []
  provincialRanking.value.forEach((item: any) => {
    cities.push(item.province)
  })
  return cities
})

const data = computed(() => {
  let data: any = []
  provincialRanking.value.forEach((item: any) => {
    // let dataArray = [item.usageDuration / 2, item.usageDuration, item.usageDuration]
    let dataArray = [0, item.usageDuration, item.usageDuration]
    data.push(dataArray)
  })
  return data
})

// const data = [
//   [5000, 10000, 6785.71]
//   // [4000, 10000, 6825],
//   // [3000, 6500, 4463.33],
//   // [2500, 5600, 3793.83],
//   // [2000, 4000, 3060],
//   // [2000, 4000, 3222.33],
//   // [2500, 4000, 3133.33],
//   // [1800, 4000, 3100],
//   // [2000, 3500, 2750],
//   // [2000, 3000, 2500],
//   // [1800, 3000, 2433.33],
//   // [2000, 2700, 2375],
//   // [1500, 2800, 2150],
//   // [1500, 2300, 2100],
//   // [1600, 3500, 2057.14],
//   // [1500, 2600, 2037.5],
//   // [1500, 2417.54, 1905.85],
//   // [1500, 2000, 1775],
//   // [1500, 1800, 1650]
// ]
// // prettier-ignore
// const cities = ['北京']

const createEchartBar = () => {
  return {
    legend: {
      show: false,
      top: 'bottom',
      data: ['Range']
    },
    grid: {
      top: 20,
      left: 20,
      right: 20,
      bottom: 20,
      containLabel: true
    },
    angleAxis: {
      type: 'category',
      data: cities,
      axisLabel: {
        color: '#ffffff',
        fontSize: 8,
        margin: 12
      },
      axisLine: {
        lineStyle: {
          color: '#67e0e3'
        }
      }
    },
    tooltip: {
      show: true,
      formatter: function (params: any) {
        const id = params.dataIndex
        return (
          cities.value[id] +
          '<br>最低：' +
          data.value[id][0] +
          '<br>平均：' +
          data.value[id][1] +
          '<br>最高：' +
          data.value[id][2]
        )
      }
    },
    radiusAxis: {
      axisLabel: {
        color: '#ffffff',
        fontSize: 8,
        margin: 6
      },
      axisLine: {
        lineStyle: {
          color: '#67e0e3'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#67e0e3',
          opacity: 0.3
        }
      }
    },
    polar: {
      center: ['50%', '50%'],
      radius: [15, '60%']
    },
    series: [
      {
        type: 'bar',
        itemStyle: {
          color: 'transparent'
        },
        data: data.value.map(function (d: any) {
          return d[0]
        }),
        coordinateSystem: 'polar',
        stack: 'Min Max',
        silent: true
      },
      {
        type: 'bar',
        data: data.value.map(function (d: any) {
          return d[1] - d[0]
        }),
        coordinateSystem: 'polar',
        name: 'Range',
        stack: 'Min Max',
        itemStyle: {
          color: '#67e0e3'
        }
      }
    ]
  }
}

function startHighlightLoop() {}

onMounted(() => {
  // setTimeout(() => {
  // console.log('data', data.value, cities.value)
  option.value = createEchartBar()
  // }, 1000)
})
onUnmounted(() => {
  if (highlightTimer) {
    clearInterval(highlightTimer)
  }
})
</script>
<style lang="scss" scoped>
.chart-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.chart-title {
  position: absolute;
  top: 10px;
  left: 70px;
  transform: translateX(-50%);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  z-index: 10;
}
.chart-content {
  position: absolute;
  top: -65px;
  left: 50px;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 200px;
  padding-top: 10px;
}
</style>
