<!-- 品牌电动车京东销量TOP10 -->
<template>
  <CPanel :height="183">
    <template #header>品牌电动车京东销量TOP10</template>
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
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
const chartRef = ref()

const rankColors = ['#FD6B6A', '#FE831F', '#FEFD29'] // 1=红, 2=橙, 3=青

const option = ref({
  grid: {
    left: 125,
    right: 20,
    top: 0,
    bottom: 10
  },
  xAxis: {
    type: 'value',
    show: false
  },
  yAxis: {
    type: 'category',
    data: ['小牛电动车', '九号Ninebot', '爱玛AIMA', '雅迪', '飞鸽', '立马', '立马1', '立马2', '立马3', '立马4'],
    inverse: true,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: '#fff',
      fontSize: 12,
      formatter: (value: any, index: number) => {
        if (index < 3) {
          return `{rank${index}|${index + 1}} {name|${value}}`
        }
        return `${index + 1} ${value}`
      },
      rich: {
        rank0: {
          color: '#fff',
          backgroundColor: rankColors[0],
          borderRadius: 8,
          padding: [2, 6],
          fontSize: 12
        },
        rank1: {
          color: '#fff',
          backgroundColor: rankColors[1],
          borderRadius: 8,
          padding: [2, 6],
          fontSize: 12
        },
        rank2: {
          color: '#fff',
          backgroundColor: rankColors[2],
          borderRadius: 8,
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
      data: [5334, 3232, 2645, 2343, 2080, 1767, 1767, 1767, 1767, 1767],
      barWidth: 10,
      itemStyle: {
        borderRadius: 8,
        color: (params: any) => {
          const gradientColors = [
            ['#FC6A6B', '#0B91D4'], // 小牛 - 红色渐变
            ['#FE831F', '#0B91D4'], // 小牛 - 红色渐变
            ['#FEFD29', '#0B91D4'], // 九号 - 橙色渐变
            ['#5CFEEE', '#0B91D4'], // 爱玛 - 青绿色渐变
            ['#5CFEEE', '#0B91D4'], // 雅迪 - 蓝色渐变
            ['#5CFEEE', '#0B91D4'], // 雅迪 - 蓝色渐变
            ['#5CFEEE', '#0B91D4'] // 雅迪 - 蓝色渐变
          ]
          const colors = gradientColors[params.dataIndex] || ['#4facfe', '#00f2fe']
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

function startHighlightLoop(chart: any) {
  if (!chart) return
  let currentIndex = 0
  const dataLength = 6 // 对应6个品牌
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
  }, 1500)
}
onMounted(() => {
  // list.value = rankingOfScenicSpots.sort((a, b) => b.value - a.value)
  // maxValue = rankingOfScenicSpots.reduce((acc, item) => acc + item.value, 0)
})
</script>
<style lang="scss" scoped>
.map {
  width: 390px;
  height: 150px;
  overflow-y: auto;
}
.map-content {
  position: relative;
  width: 390px;
  height: 250px;
}
</style>
