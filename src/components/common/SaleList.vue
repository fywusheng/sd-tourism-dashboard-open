<!-- 省份销量排行榜组件 -->
<template>
  <div class="sale-list">
    <div class="top-banner">
      <div class="top-item" v-for="(item, index) in topThree" :key="index">
        <div class="rank-number">{{ item.value }}</div>
        <div class="rank-label">{{ item.label }}{{ item.name }}</div>
      </div>
    </div>

    <div class="chart-container">
      <CEcharts ref="chartRef" :option="option" @onload="startHighlightLoop" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CEcharts from '@/components/common/CEcharts.vue'
import { ref, computed, onMounted, nextTick } from 'vue'

interface SaleData {
  name: string
  value: number
  unit?: string
}

// 定义props
interface Props {
  data?: SaleData[]
  title?: string
  unit?: string
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [
    { name: '陕西', value: 53.2 },
    { name: '山西', value: 43.2 },
    { name: '山东', value: 23.2 },
    { name: '河北', value: 16.8 },
    { name: '天津', value: 13.5 },
    { name: '湖南', value: 11.8 }
  ],
  title: '省份销量排行',
  unit: '千台',
  height: 300
})

const chartRef = ref()

// 计算前三名数据
const topThree = computed(() => {
  const sorted = [...props.data].sort((a, b) => b.value - a.value)
  return sorted.slice(0, 3).map((item, index) => ({
    ...item,
    label: `TOP${index + 1}`
  }))
})

// 图表配置 - 改为computed确保数据变化时重新计算
const option = computed(() => ({
  grid: {
    left: 60,
    right: 80,
    top: 10,
    bottom: 10
  },
  xAxis: {
    type: 'value',
    show: false,
    max: 'dataMax'
  },
  yAxis: {
    type: 'category',
    data: props.data.map(item => item.name),
    inverse: true,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      margin: 15
    }
  },
  series: [
    {
      type: 'bar',
      data: props.data.map(item => item.value),
      barWidth: 10,
      itemStyle: {
        borderRadius: [0, 6, 6, 0],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#0B91D4'
            },
            {
              offset: 1,
              color: '#5CFEED'
            }
          ]
        },
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowBlur: 10,
        shadowOffsetY: 2
      },
      label: {
        show: true,
        position: 'right',
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        formatter: (params: any) => `${params.value}${props.unit}`,
        offset: [8, 0]
      }
    }
  ]
}))

// 高亮循环动画
function startHighlightLoop(chart: any) {
  if (!chart) return

  // 延时确保图表已经完全渲染
  setTimeout(() => {
    // 强制resize确保图表正确显示
    chart.resize()

    let currentIndex = 0
    const dataLength = props.data.length

    setInterval(() => {
      // 取消之前的高亮
      chart.dispatchAction({
        type: 'downplay'
      })
      // 高亮当前柱子
      chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: currentIndex
      })
      // 更新索引，循环
      currentIndex = (currentIndex + 1) % dataLength
    }, 2000)
  }, 100)
}

onMounted(() => {
  // 确保DOM完全渲染后再处理图表
  nextTick(() => {
    setTimeout(() => {
      if (chartRef.value) {
        // 尝试触发resize
        window.dispatchEvent(new Event('resize'))
      }
    }, 200)
  })
})
</script>

<style lang="scss" scoped>
.sale-list {
  width: 100%;
  padding-left: 5px;

  .top-banner {
    display: flex;
    justify-content: space-around;
    margin-bottom: 17px;

    .top-item {
      position: relative;
      text-align: center;
      min-width: 120px;
      width: 91px;
      height: 41px;
      box-sizing: border-box;
      background: url('@/assets/img/sort-border.png') no-repeat center center;
      background-size: 100% 100%;

      .rank-number {
        font-size: 19px;
        font-weight: bold;
        // color: #ffffff;
        // : linear-gradient(180deg, rgba(93, 255, 238, 0) 0%, #5dffee 100%);
        // line-height: 1;
        display: inline-block;
        background: -webkit-linear-gradient(top, #ffffff, #5dffee);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
      }

      .rank-label {
        font-size: 10px;
        color: #ffffff;
      }

      .rank-name {
        font-size: 14px;
        color: #fff;
        font-weight: bold;
      }
    }
  }

  .chart-container {
    height: v-bind('props.height + "px"');
    width: 100%;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .sale-list {
    .top-banner {
      flex-direction: column;
      gap: 10px;

      .top-item {
        margin: 0 auto;
        max-width: 200px;
      }
    }
  }
}
</style>
