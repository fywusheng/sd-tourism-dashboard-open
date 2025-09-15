<!-- 品牌电动车京东销量TOP10 -->
<template>
  <CPanel :height="183">
    <template #header>品牌电动车京东当日销量TOP10</template>
    <template #content>
      <div class="map">
        <div class="map-content">
          <CEcharts ref="chartRef" :option="option" @onload="startHighlightLoop" />
        </div>
      </div>
    </template>
  </CPanel>
</template>

<script setup lang="ts">
import CPanel from '@/components/common/CPanel.vue'
import CEcharts from '@/components/common/CEcharts.vue'
import { onMounted, ref, inject, computed, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

// // 原始数据
// const topTenDataRaw: any = ref([
//   {
//     'RankVary': 0,
//     'BrandName': '九号（Ninebot）',
//     'PVIndex': {
//       'median': 62500,
//       'percentType': 1,
//       'left': '5',
//       'leftUnit': '万',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '万',
//       'range': '50000.0 ~ 75000.0',
//       'right': '7.5',
//       'separator': '~'
//     },
//     'DealProNumIndex': {
//       'median': 45,
//       'percentType': 1,
//       'left': '10',
//       'leftUnit': '',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '',
//       'range': '10.0 ~ 50.0',
//       'right': '50',
//       'separator': '~'
//     },
//     'UVIndex': {
//       'median': 17500,
//       'percentType': 1,
//       'left': '1',
//       'leftUnit': '万',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '万',
//       'range': '10000.0 ~ 25000.0',
//       'right': '2.5',
//       'separator': '~'
//     },
//     'BrandId': '49043',
//     'DealAmtIndex': {
//       'median': 75000,
//       'percentType': 1,
//       'left': '5',
//       'leftUnit': '万',
//       'leftPrefix': '￥',
//       'dataType': 'index_range',
//       'rightPrefix': '￥',
//       'rightUnit': '万',
//       'range': '50000.0 ~ 100000.0',
//       'right': '10',
//       'separator': '~'
//     }
//   },
//   {
//     'RankVary': 0,
//     'BrandName': '飛鸽（FG FLYING PIGEON）',
//     'PVIndex': {
//       'median': 37500,
//       'percentType': 1,
//       'left': '2.5',
//       'leftUnit': '万',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '万',
//       'range': '25000.0 ~ 50000.0',
//       'right': '5',
//       'separator': '~'
//     },
//     'DealProNumIndex': {
//       'median': 75,
//       'percentType': 1,
//       'left': '50',
//       'leftUnit': '',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '',
//       'range': '50.0 ~ 100.0',
//       'right': '100',
//       'separator': '~'
//     },
//     'UVIndex': {
//       'median': 9000,
//       'percentType': 1,
//       'left': '8,000',
//       'leftUnit': '',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '万',
//       'range': '8000.0 ~ 10000.0',
//       'right': '1',
//       'separator': '~'
//     },
//     'BrandId': '334338',
//     'DealAmtIndex': {
//       'median': 75000,
//       'percentType': 1,
//       'left': '5',
//       'leftUnit': '万',
//       'leftPrefix': '￥',
//       'dataType': 'index_range',
//       'rightPrefix': '￥',
//       'rightUnit': '万',
//       'range': '50000.0 ~ 100000.0',
//       'right': '10',
//       'separator': '~'
//     }
//   },
//   {
//     'RankVary': 0,
//     'BrandName': '爱玛（AIMA）',
//     'PVIndex': {
//       'median': 62500,
//       'percentType': 1,
//       'left': '5',
//       'leftUnit': '万',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '万',
//       'range': '50000.0 ~ 75000.0',
//       'right': '7.5',
//       'separator': '~'
//     },
//     'DealProNumIndex': {
//       'median': 41,
//       'percentType': 1,
//       'left': '10',
//       'leftUnit': '',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '',
//       'range': '10.0 ~ 50.0',
//       'right': '50',
//       'separator': '~'
//     },
//     'UVIndex': {
//       'median': 17500,
//       'percentType': 1,
//       'left': '1',
//       'leftUnit': '万',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '万',
//       'range': '10000.0 ~ 25000.0',
//       'right': '2.5',
//       'separator': '~'
//     },
//     'BrandId': '70411',
//     'DealAmtIndex': {
//       'median': 75000,
//       'percentType': 1,
//       'left': '5',
//       'leftUnit': '万',
//       'leftPrefix': '￥',
//       'dataType': 'index_range',
//       'rightPrefix': '￥',
//       'rightUnit': '万',
//       'range': '50000.0 ~ 100000.0',
//       'right': '10',
//       'separator': '~'
//     }
//   },
//   {
//     'RankVary': 0,
//     'BrandName': '绿源（Luyuan）',
//     'PVIndex': {
//       'median': 37500,
//       'percentType': 1,
//       'left': '2.5',
//       'leftUnit': '万',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '万',
//       'range': '25000.0 ~ 50000.0',
//       'right': '5',
//       'separator': '~'
//     },
//     'DealProNumIndex': {
//       'median': 36,
//       'percentType': 1,
//       'left': '10',
//       'leftUnit': '',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '',
//       'range': '10.0 ~ 50.0',
//       'right': '50',
//       'separator': '~'
//     },
//     'UVIndex': {
//       'median': 9000,
//       'percentType': 1,
//       'left': '8,000',
//       'leftUnit': '',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '万',
//       'range': '8000.0 ~ 10000.0',
//       'right': '1',
//       'separator': '~'
//     },
//     'BrandId': '135640',
//     'DealAmtIndex': {
//       'median': 30000,
//       'percentType': 1,
//       'left': '1',
//       'leftUnit': '万',
//       'leftPrefix': '￥',
//       'dataType': 'index_range',
//       'rightPrefix': '￥',
//       'rightUnit': '万',
//       'range': '10000.0 ~ 50000.0',
//       'right': '5',
//       'separator': '~'
//     }
//   },
//   {
//     'RankVary': 0,
//     'BrandName': '雅迪',
//     'PVIndex': {
//       'median': 62500,
//       'percentType': 1,
//       'left': '5',
//       'leftUnit': '万',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '万',
//       'range': '50000.0 ~ 75000.0',
//       'right': '7.5',
//       'separator': '~'
//     },
//     'DealProNumIndex': {
//       'median': 33,
//       'percentType': 1,
//       'left': '10',
//       'leftUnit': '',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '',
//       'range': '10.0 ~ 50.0',
//       'right': '50',
//       'separator': '~'
//     },
//     'UVIndex': {
//       'median': 17500,
//       'percentType': 1,
//       'left': '1',
//       'leftUnit': '万',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '万',
//       'range': '10000.0 ~ 25000.0',
//       'right': '2.5',
//       'separator': '~'
//     },
//     'BrandId': '480076',
//     'DealAmtIndex': {
//       'median': 30000,
//       'percentType': 1,
//       'left': '1',
//       'leftUnit': '万',
//       'leftPrefix': '￥',
//       'dataType': 'index_range',
//       'rightPrefix': '￥',
//       'rightUnit': '万',
//       'range': '10000.0 ~ 50000.0',
//       'right': '5',
//       'separator': '~'
//     }
//   },
//   {
//     'RankVary': 0,
//     'BrandName': '小牛电动',
//     'PVIndex': {
//       'median': 37500,
//       'percentType': 1,
//       'left': '2.5',
//       'leftUnit': '万',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '万',
//       'range': '25000.0 ~ 50000.0',
//       'right': '5',
//       'separator': '~'
//     },
//     'DealProNumIndex': {
//       'median': 10,
//       'percentType': 1,
//       'left': '5',
//       'leftUnit': '',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '',
//       'range': '5.0 ~ 10.0',
//       'right': '10',
//       'separator': '~'
//     },
//     'UVIndex': {
//       'median': 5000,
//       'percentType': 1,
//       'left': '4,000',
//       'leftUnit': '',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '',
//       'range': '4000.0 ~ 6000.0',
//       'right': '6,000',
//       'separator': '~'
//     },
//     'BrandId': '198145',
//     'DealAmtIndex': {
//       'median': 30000,
//       'percentType': 1,
//       'left': '1',
//       'leftUnit': '万',
//       'leftPrefix': '￥',
//       'dataType': 'index_range',
//       'rightPrefix': '￥',
//       'rightUnit': '万',
//       'range': '10000.0 ~ 50000.0',
//       'right': '5',
//       'separator': '~'
//     }
//   },
//   {
//     'RankVary': 0,
//     'BrandName': '台铃',
//     'PVIndex': {
//       'median': 37500,
//       'percentType': 1,
//       'left': '2.5',
//       'leftUnit': '万',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '万',
//       'range': '25000.0 ~ 50000.0',
//       'right': '5',
//       'separator': '~'
//     },
//     'DealProNumIndex': {
//       'median': 24,
//       'percentType': 1,
//       'left': '10',
//       'leftUnit': '',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '',
//       'range': '10.0 ~ 50.0',
//       'right': '50',
//       'separator': '~'
//     },
//     'UVIndex': {
//       'median': 17500,
//       'percentType': 1,
//       'left': '1',
//       'leftUnit': '万',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '万',
//       'range': '10000.0 ~ 25000.0',
//       'right': '2.5',
//       'separator': '~'
//     },
//     'BrandId': '1113885',
//     'DealAmtIndex': {
//       'median': 30000,
//       'percentType': 1,
//       'left': '1',
//       'leftUnit': '万',
//       'leftPrefix': '￥',
//       'dataType': 'index_range',
//       'rightPrefix': '￥',
//       'rightUnit': '万',
//       'range': '10000.0 ~ 50000.0',
//       'right': '5',
//       'separator': '~'
//     }
//   },
//   {
//     'RankVary': 0,
//     'BrandName': '硕源',
//     'PVIndex': {
//       'median': 17500,
//       'percentType': 1,
//       'left': '1',
//       'leftUnit': '万',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '万',
//       'range': '10000.0 ~ 25000.0',
//       'right': '2.5',
//       'separator': '~'
//     },
//     'DealProNumIndex': {
//       'median': 30,
//       'percentType': 1,
//       'left': '10',
//       'leftUnit': '',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '',
//       'range': '10.0 ~ 50.0',
//       'right': '50',
//       'separator': '~'
//     },
//     'UVIndex': {
//       'median': 3000,
//       'percentType': 1,
//       'left': '2,000',
//       'leftUnit': '',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '',
//       'range': '2000.0 ~ 4000.0',
//       'right': '4,000',
//       'separator': '~'
//     },
//     'BrandId': '1164574',
//     'DealAmtIndex': {
//       'median': 30000,
//       'percentType': 1,
//       'left': '1',
//       'leftUnit': '万',
//       'leftPrefix': '￥',
//       'dataType': 'index_range',
//       'rightPrefix': '￥',
//       'rightUnit': '万',
//       'range': '10000.0 ~ 50000.0',
//       'right': '5',
//       'separator': '~'
//     }
//   },
//   {
//     'RankVary': 0,
//     'BrandName': '立马',
//     'PVIndex': {
//       'median': 17500,
//       'percentType': 1,
//       'left': '1',
//       'leftUnit': '万',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '万',
//       'range': '10000.0 ~ 25000.0',
//       'right': '2.5',
//       'separator': '~'
//     },
//     'DealProNumIndex': {
//       'median': 15,
//       'percentType': 1,
//       'left': '5',
//       'leftUnit': '',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '',
//       'range': '5.0 ~ 10.0',
//       'right': '10',
//       'separator': '~'
//     },
//     'UVIndex': {
//       'median': 3000,
//       'percentType': 1,
//       'left': '2,000',
//       'leftUnit': '',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '',
//       'range': '2000.0 ~ 4000.0',
//       'right': '4,000',
//       'separator': '~'
//     },
//     'BrandId': '189524',
//     'DealAmtIndex': {
//       'median': 30000,
//       'percentType': 1,
//       'left': '1',
//       'leftUnit': '万',
//       'leftPrefix': '￥',
//       'dataType': 'index_range',
//       'rightPrefix': '￥',
//       'rightUnit': '万',
//       'range': '10000.0 ~ 50000.0',
//       'right': '5',
//       'separator': '~'
//     }
//   },
//   {
//     'RankVary': 0,
//     'BrandName': '凤凰（Phoenix）',
//     'PVIndex': {
//       'median': 37500,
//       'percentType': 1,
//       'left': '2.5',
//       'leftUnit': '万',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '万',
//       'range': '25000.0 ~ 50000.0',
//       'right': '5',
//       'separator': '~'
//     },
//     'DealProNumIndex': {
//       'median': 13,
//       'percentType': 1,
//       'left': '5',
//       'leftUnit': '',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '',
//       'range': '5.0 ~ 10.0',
//       'right': '10',
//       'separator': '~'
//     },
//     'UVIndex': {
//       'median': 7000,
//       'percentType': 1,
//       'left': '6,000',
//       'leftUnit': '',
//       'leftPrefix': '',
//       'dataType': 'index_range',
//       'rightPrefix': '',
//       'rightUnit': '',
//       'range': '6000.0 ~ 8000.0',
//       'right': '8,000',
//       'separator': '~'
//     },
//     'BrandId': '156969',
//     'DealAmtIndex': {
//       'median': 30000,
//       'percentType': 1,
//       'left': '1',
//       'leftUnit': '万',
//       'leftPrefix': '￥',
//       'dataType': 'index_range',
//       'rightPrefix': '￥',
//       'rightUnit': '万',
//       'range': '10000.0 ~ 50000.0',
//       'right': '5',
//       'separator': '~'
//     }
//   }
// ])

// // 按照 DealAmtIndex.median 降序排列，如果相同则按 DealProNumIndex.median 降序
// const topTenData = computed(() => {
//   return [...topTenDataRaw.value].sort((a, b) => {
//     // 首先按 DealAmtIndex.median 降序
//     const dealAmtDiff = b.DealAmtIndex.median - a.DealAmtIndex.median
//     if (dealAmtDiff !== 0) {
//       return dealAmtDiff
//     }
//     // 如果 DealAmtIndex.median 相同，则按 DealProNumIndex.median 降序
//     return b.DealProNumIndex.median - a.DealProNumIndex.median
//   })
// })
const topTenData = inject('topTenData') as any
const yDataNames = computed(() => {
  return topTenData.value && topTenData.value.length > 0
    ? topTenData.value.map((item: any, index: any) => ({
        name: item.brandName,
        rank: index // 添加排名信息
      }))
    : []
})
const seriesData = computed(() => {
  return topTenData.value && topTenData.value.length > 0 ? topTenData.value.map((item: any) => item.value) : []
})

const chartRef = ref()
const rankColors = ['#FD6B6A', '#FE831F', '#FEFD29'] // 1=红, 2=橙, 3=青
// 图表配置
const option = ref({
  grid: {
    left: 80,
    right: 40,
    top: 10,
    bottom: 10
  },
  xAxis: {
    type: 'value',
    show: false
  },
  dataZoom: [
    //滑动条
    {
      yAxisIndex: 0, //这里是从X轴的0刻度开始
      show: false, //是否显示滑动条，不影响使用
      type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
      startValue: 0, // 从头开始。
      endValue: 4 // 一次性展示5个。
    }
  ],
  yAxis: {
    type: 'category',
    data: yDataNames.value.map((item: any) => item.name),
    inverse: true,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: '#fff',
      fontSize: 12,
      formatter: (value: any, index: number) => {
        // 获取当前滚动区间的起始位置
        const startValue = option.value.dataZoom[0].startValue
        // 计算在整个数据集中的实际排名
        const actualRank = startValue + index

        if (actualRank < 3) {
          return `{rank${actualRank}|${actualRank + 1}} {name|${value}}`
        }
        return `${actualRank + 1} ${value}`
      },
      rich: {
        rank0: {
          color: '#333333',
          backgroundColor: rankColors[0],
          borderRadius: 4,
          padding: [2, 6],
          fontSize: 12
        },
        rank1: {
          color: '#333333',
          backgroundColor: rankColors[1],
          borderRadius: 4,
          padding: [2, 6],
          fontSize: 12
        },
        rank2: {
          color: '#333333',
          backgroundColor: rankColors[2],
          borderRadius: 4,
          padding: [2, 6],
          fontSize: 12
        },
        name: {
          color: '#fff',
          fontSize: 14,
          padding: [0, 4]
        }
      }
    }
  },
  series: [
    {
      type: 'bar',
      data: seriesData,
      barWidth: 10,
      itemStyle: {
        borderRadius: 8,
        color: (params: any) => {
          const gradientColors = [
            ['#FC6A6B', '#0B91D4'], // 第1名 - 红色渐变
            ['#FE831F', '#0B91D4'], // 第2名 - 橙色渐变
            ['#FEFD29', '#0B91D4'], // 第3名 - 黄色渐变
            ['#5CFEEE', '#0B91D4'], // 第4名及以后 - 青绿色渐变
            ['#5CFEEE', '#0B91D4'],
            ['#5CFEEE', '#0B91D4'],
            ['#5CFEEE', '#0B91D4']
          ]
          // 获取当前滚动区间的起始位置
          const startValue = option.value.dataZoom[0].startValue
          // 计算在整个数据集中的实际排名
          const actualRank = startValue + params.dataIndex

          const colors = gradientColors[actualRank] || ['#5CFEEE', '#0B91D4']
          return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: colors[0] },
            { offset: 1, color: colors[1] }
          ])
        }
      },
      label: {
        show: true,
        position: 'right',
        color: '#fff',
        fontSize: 12,
        formatter: '{c}台'
      }
    }
  ]
})

let scrollTimer: any = null

function startAutoScroll() {
  // 检查是否有数据
  if (!yDataNames.value || yDataNames.value.length === 0) {
    console.log('暂无数据，跳过自动滚动')
    return
  }

  // 清除之前的定时器
  if (scrollTimer) {
    clearInterval(scrollTimer)
  }

  scrollTimer = setInterval(() => {
    const maxStartValue = yDataNames.value.length - 5 // 最大起始值 = 总数 - 显示数量
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

function startHighlightLoop(_chart: any) {
  // 延迟一下确保图表完全初始化
  setTimeout(() => {
    startAutoScroll()
  }, 500)
}

onMounted(() => {
  // list.value = rankingOfScenicSpots.sort((a, b) => b.value - a.value)
  // maxValue = rankingOfScenicSpots.reduce((acc, item) => acc + item.value, 0)

  // 备用启动方式：如果图表回调没有触发，则在组件挂载后直接启动
  setTimeout(() => {
    if (!scrollTimer) {
      startAutoScroll()
    }
  }, 2000)
})

// 监听 topTenData 的变化，当数据从空变为有值时重新初始化图表
watch(
  topTenData,
  newVal => {
    if (newVal && newVal.length > 0) {
      // 等待 DOM 更新后重新初始化图表
      setTimeout(() => {
        // 创建新的 option 对象来避免代理错误
        const newOption = {
          ...option.value,
          yAxis: {
            ...option.value.yAxis,
            data: yDataNames.value.map((item: any) => item.name)
          },
          series: [
            {
              ...option.value.series[0],
              data: seriesData.value
            }
          ],
          dataZoom: [
            {
              ...option.value.dataZoom[0],
              startValue: 0,
              endValue: 4
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
            // 数据更新后启动自动滚动
            if (!scrollTimer) {
              startAutoScroll()
            }
          }
        }
      }, 100)
    }
  },
  { immediate: true, deep: true }
)

onUnmounted(() => {
  // 组件销毁时清除定时器
  if (scrollTimer) {
    clearInterval(scrollTimer)
    scrollTimer = null
  }
})
</script>
<style lang="scss" scoped>
.map {
  // width: 250px;
  //height: 250px;
  //overflow-y: auto;
}
.map-content {
  position: relative;
  height: 150px;
  padding-left: 10px;
}
</style>
