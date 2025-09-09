<!-- 运行时长 -->
<template>
  <CPanel :height="183">
    <template #header>运行时长</template>
    <template #content>
      <div class="gauge-container">
        <div class="gauge-item">
          <CEcharts ref="chartRef1" :option="gaugeOption1" />
          <div class="gauge-title">运行时长 (min)</div>
        </div>
        <div class="gauge-item">
          <CEcharts ref="chartRef2" :option="gaugeOption2" />
          <div class="gauge-title">平均使用时长 (min)</div>
        </div>
      </div>
    </template>
  </CPanel>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, inject } from 'vue'
import CPanel from '@/components/common/CPanel.vue'
import CEcharts from '@/components/common/CEcharts.vue'
const rightPanelData: any = inject('rightPanelData', ref({}))

const totalRunningDuration = computed(() => {
  // const value = rightPanelData?.value?.totalRunningDuration || 345 // 默认值
  const value = 768320 // 默认值
  return value
})
const averageUsageDuration = computed(() => {
  const value = rightPanelData?.value?.averageUsageDuration || 50 // 默认值
  return value
})

const chartRef1 = ref()
const chartRef2 = ref()

// 创建仪表盘配置
const createGaugeOption = (value: number, max: number = 100) => {
  return {
    series: [
      {
        type: 'gauge',
        center: ['50%', '60%'],
        radius: '70%',
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: max,
        splitNumber: 10,
        itemStyle: {
          color: '#58D9F9',
          shadowColor: 'rgba(0,138,255,0.45)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2
        },
        progress: {
          show: true,
          roundCap: true,
          width: 6
        },
        pointer: {
          icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
          length: '75%',
          width: 12,
          offsetCenter: [0, '5%']
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 6,
            color: [
              [0.3, '#4CFF81'],
              [0.7, '#5DFFED'],
              [1, '#FD6A6B']
            ]
          }
        },
        axisTick: {
          distance: -20,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: '#67e0e3'
          }
        },
        splitLine: {
          distance: -25,
          length: 10,
          lineStyle: {
            width: 2,
            color: '#67e0e3'
          }
        },
        axisLabel: {
          distance: -20,
          color: '#67e0e3',
          fontSize: 10
        },
        anchor: {
          show: false
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          width: '60%',
          lineHeight: 30,
          borderRadius: 8,
          offsetCenter: [0, '25%'],
          fontSize: 20,
          fontWeight: 'bolder',
          formatter: '{value}',
          color: '#fff'
        },
        data: [
          {
            value: value
          }
        ]
      }
    ]
  }
}

// 第一个仪表盘配置（运行时长）
const gaugeOption1 = computed(() => createGaugeOption(totalRunningDuration.value, 100))

// 第二个仪表盘配置（平均使用时长）
const gaugeOption2 = computed(() => createGaugeOption(averageUsageDuration.value, 100))

onMounted(() => {
  // 组件挂载后的逻辑
})
</script>
<style lang="scss" scoped>
.gauge-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 5px 10px;

  .gauge-item {
    flex: 1;
    height: 140px;
    position: relative;

    &:first-child {
      margin-right: 16px;
    }

    .gauge-title {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 12px;
      text-align: center;
      white-space: nowrap;
    }
  }
}
</style>
