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
    <div class="chart-tips">未展示省份，本日销售数量为零</div>
  </div>
</template>

<script setup lang="ts">
import CEcharts from '@/components/common/CEcharts.vue'
import { ref, computed, onMounted, nextTick, onUnmounted, watch } from 'vue'

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
let scrollTimer: any = null
let highlightTimer: any = null

// 计算前三名数据
const topThree = computed(() => {
  const sorted = [...props.data].sort((a, b) => b.value - a.value)
  return sorted.slice(0, 3).map((item, index) => ({
    ...item,
    label: `TOP${index + 1}`
  }))
})

// 图表配置 - 改为computed确保数据变化时重新计算
const option = ref({
  grid: {
    left: 20, // 增加左边距给Y轴标签更多空间
    right: 60,
    top: 10,
    bottom: 0,
    containLabel: true // 确保标签在网格内
  },
  dataZoom: [
    {
      yAxisIndex: 0, // 对y轴进行缩放
      show: false, // 不显示滑动条，只用于自动滚动
      type: 'slider',
      startValue: 0,
      endValue: Math.min(4, props.data.length - 1) // 一次显示5个项目
    }
  ],
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
      fontSize: 10, // 减小字体大小以适应更多标签
      // fontWeight: 'bold',
      margin: 8, // 减小边距
      interval: 0, // 强制显示所有标签
      overflow: 'none', // 不裁剪标签
      width: 45, // 减小标签宽度
      formatter: function (value: string, index: number) {
        // 获取当前滚动区间的起始位置
        const startValue = option.value.dataZoom[0].startValue
        // 计算在整个数据集中的实际排名
        const actualRank = startValue + index + 1

        // 显示排名和名称
        const displayText = value.length > 3 ? value.substring(0, 3) + '..' : value
        return `${actualRank}. ${displayText}`
      }
    },
    // 确保有足够空间显示所有标签
    splitNumber: props.data.length
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
        fontSize: 12,
        formatter: (params: any) => `${params.value}${props.unit}`,
        offset: [8, 0]
      }
    }
  ]
})

// 自动滚动功能
function startAutoScroll() {
  // 清除之前的定时器
  if (scrollTimer) {
    clearInterval(scrollTimer)
  }

  // 如果数据少于等于5项，不需要滚动
  if (props.data.length <= 5) {
    return
  }

  scrollTimer = setInterval(() => {
    const maxStartValue = props.data.length - 5 // 最大起始值 = 总数 - 显示数量
    let newStartValue, newEndValue

    // 检查是否已经滚动到最后一组
    if (option.value.dataZoom[0].startValue >= maxStartValue) {
      // 重置到开头
      newEndValue = 4
      newStartValue = 0
    } else {
      // 继续滚动
      newEndValue = option.value.dataZoom[0].endValue + 1
      newStartValue = option.value.dataZoom[0].startValue + 1
    }

    // 创建新的 option 对象
    const newOption = {
      ...option.value,
      dataZoom: [
        {
          ...option.value.dataZoom[0],
          startValue: newStartValue,
          endValue: newEndValue
        }
      ]
    }

    // 更新 option
    option.value = newOption

    // 强制更新图表
    if (chartRef.value && chartRef.value.getChart) {
      const chart = chartRef.value.getChart()
      if (chart) {
        chart.setOption(option.value, true)
      }
    }
  }, 2000)
}

// 高亮循环动画
function startHighlightLoop(chart: any) {}

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

  // 备用启动方式：如果图表回调没有触发，则在组件挂载后直接启动
  setTimeout(() => {
    if (!scrollTimer && props.data.length > 5) {
      startAutoScroll()
    }
  }, 3000)
})

// 监听props.data的变化
watch(
  () => props.data,
  newData => {
    if (newData && newData.length > 0) {
      // 创建新的 option 对象来避免代理错误
      const newOption = {
        ...option.value,
        yAxis: {
          ...option.value.yAxis,
          data: newData.map(item => item.name)
        },
        series: [
          {
            ...option.value.series[0],
            data: newData.map(item => item.value)
          }
        ],
        dataZoom: [
          {
            ...option.value.dataZoom[0],
            startValue: 0,
            endValue: Math.min(4, newData.length - 1)
          }
        ]
      }

      // 更新 option
      option.value = newOption

      // 强制更新图表
      if (chartRef.value && chartRef.value.getChart) {
        const chart = chartRef.value.getChart()
        if (chart) {
          chart.setOption(option.value, true)
          // 重新启动自动滚动
          if (scrollTimer) {
            clearInterval(scrollTimer)
            scrollTimer = null
          }
          if (newData.length > 5) {
            setTimeout(() => {
              startAutoScroll()
            }, 500)
          }
        }
      }
    }
  },
  { deep: true, immediate: true }
)

onUnmounted(() => {
  // 组件销毁时清除定时器
  if (scrollTimer) {
    clearInterval(scrollTimer)
    scrollTimer = null
  }
  if (highlightTimer) {
    clearInterval(highlightTimer)
    highlightTimer = null
  }
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
    height: 140px;
    width: 100%;
  }
  .chart-tips {
    text-align: center;
    font-size: 12px;
    // margin-bottom: 10px;
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
