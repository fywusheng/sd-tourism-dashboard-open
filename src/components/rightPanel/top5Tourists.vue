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
import { ref, onMounted, onUnmounted } from 'vue'
import CPanel from '@/components/common/CPanel.vue'
import CEcharts from '@/components/common/CEcharts.vue'

const option = ref<any>({})
const chartRef = ref()
let highlightTimer: any = null
let currentIndex = 0
const VALUE = [123, 100, 125, 100, 125]

const barHeight = 50
const data = [
  [5000, 10000, 6785.71],
  [4000, 10000, 6825],
  [3000, 6500, 4463.33],
  [2500, 5600, 3793.83],
  [2000, 4000, 3060],
  [2000, 4000, 3222.33],
  [2500, 4000, 3133.33],
  [1800, 4000, 3100],
  [2000, 3500, 2750],
  [2000, 3000, 2500],
  [1800, 3000, 2433.33],
  [2000, 2700, 2375],
  [1500, 2800, 2150],
  [1500, 2300, 2100],
  [1600, 3500, 2057.14],
  [1500, 2600, 2037.5],
  [1500, 2417.54, 1905.85],
  [1500, 2000, 1775],
  [1500, 1800, 1650]
]
// prettier-ignore
const cities = ['北京', '上海', '深圳', '广州', '苏州', '杭州', '南京', '福州', '青岛', '济南', '长春', '大连', '温州', '郑州', '武汉', '成都', '东莞', '沈阳', '烟台']

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
        return cities[id] + '<br>Lowest：' + data[id][0] + '<br>Highest：' + data[id][1] + '<br>Average：' + data[id][2]
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
        data: data.map(function (d) {
          return d[0]
        }),
        coordinateSystem: 'polar',
        stack: 'Min Max',
        silent: true
      },
      {
        type: 'bar',
        data: data.map(function (d) {
          return d[1] - d[0]
        }),
        coordinateSystem: 'polar',
        name: 'Range',
        stack: 'Min Max',
        itemStyle: {
          color: '#67e0e3'
        }
      },
      {
        type: 'bar',
        itemStyle: {
          color: 'transparent'
        },
        data: data.map(function (d) {
          return d[2] - barHeight
        }),
        coordinateSystem: 'polar',
        stack: 'Average',
        silent: true,
        z: 10
      }
    ]
  }
}

onMounted(() => {
  option.value = createEchartBar()
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
