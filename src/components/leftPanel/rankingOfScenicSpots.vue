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
import { onMounted, ref, inject, computed } from 'vue'
import * as echarts from 'echarts'

// 原始数据
const topTenDataRaw: any = ref([
  {
    'RankVary': 0,
    'BrandName': '九号（Ninebot）',
    'PVIndex': {
      'median': 62500,
      'percentType': 1,
      'left': '5',
      'leftUnit': '万',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '万',
      'range': '50000.0 ~ 75000.0',
      'right': '7.5',
      'separator': '~'
    },
    'DealProNumIndex': {
      'median': 45,
      'percentType': 1,
      'left': '10',
      'leftUnit': '',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '',
      'range': '10.0 ~ 50.0',
      'right': '50',
      'separator': '~'
    },
    'UVIndex': {
      'median': 17500,
      'percentType': 1,
      'left': '1',
      'leftUnit': '万',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '万',
      'range': '10000.0 ~ 25000.0',
      'right': '2.5',
      'separator': '~'
    },
    'BrandId': '49043',
    'DealAmtIndex': {
      'median': 75000,
      'percentType': 1,
      'left': '5',
      'leftUnit': '万',
      'leftPrefix': '￥',
      'dataType': 'index_range',
      'rightPrefix': '￥',
      'rightUnit': '万',
      'range': '50000.0 ~ 100000.0',
      'right': '10',
      'separator': '~'
    }
  },
  {
    'RankVary': 0,
    'BrandName': '飛鸽（FG FLYING PIGEON）',
    'PVIndex': {
      'median': 37500,
      'percentType': 1,
      'left': '2.5',
      'leftUnit': '万',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '万',
      'range': '25000.0 ~ 50000.0',
      'right': '5',
      'separator': '~'
    },
    'DealProNumIndex': {
      'median': 75,
      'percentType': 1,
      'left': '50',
      'leftUnit': '',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '',
      'range': '50.0 ~ 100.0',
      'right': '100',
      'separator': '~'
    },
    'UVIndex': {
      'median': 9000,
      'percentType': 1,
      'left': '8,000',
      'leftUnit': '',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '万',
      'range': '8000.0 ~ 10000.0',
      'right': '1',
      'separator': '~'
    },
    'BrandId': '334338',
    'DealAmtIndex': {
      'median': 75000,
      'percentType': 1,
      'left': '5',
      'leftUnit': '万',
      'leftPrefix': '￥',
      'dataType': 'index_range',
      'rightPrefix': '￥',
      'rightUnit': '万',
      'range': '50000.0 ~ 100000.0',
      'right': '10',
      'separator': '~'
    }
  },
  {
    'RankVary': 0,
    'BrandName': '爱玛（AIMA）',
    'PVIndex': {
      'median': 62500,
      'percentType': 1,
      'left': '5',
      'leftUnit': '万',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '万',
      'range': '50000.0 ~ 75000.0',
      'right': '7.5',
      'separator': '~'
    },
    'DealProNumIndex': {
      'median': 41,
      'percentType': 1,
      'left': '10',
      'leftUnit': '',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '',
      'range': '10.0 ~ 50.0',
      'right': '50',
      'separator': '~'
    },
    'UVIndex': {
      'median': 17500,
      'percentType': 1,
      'left': '1',
      'leftUnit': '万',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '万',
      'range': '10000.0 ~ 25000.0',
      'right': '2.5',
      'separator': '~'
    },
    'BrandId': '70411',
    'DealAmtIndex': {
      'median': 75000,
      'percentType': 1,
      'left': '5',
      'leftUnit': '万',
      'leftPrefix': '￥',
      'dataType': 'index_range',
      'rightPrefix': '￥',
      'rightUnit': '万',
      'range': '50000.0 ~ 100000.0',
      'right': '10',
      'separator': '~'
    }
  },
  {
    'RankVary': 0,
    'BrandName': '绿源（Luyuan）',
    'PVIndex': {
      'median': 37500,
      'percentType': 1,
      'left': '2.5',
      'leftUnit': '万',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '万',
      'range': '25000.0 ~ 50000.0',
      'right': '5',
      'separator': '~'
    },
    'DealProNumIndex': {
      'median': 36,
      'percentType': 1,
      'left': '10',
      'leftUnit': '',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '',
      'range': '10.0 ~ 50.0',
      'right': '50',
      'separator': '~'
    },
    'UVIndex': {
      'median': 9000,
      'percentType': 1,
      'left': '8,000',
      'leftUnit': '',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '万',
      'range': '8000.0 ~ 10000.0',
      'right': '1',
      'separator': '~'
    },
    'BrandId': '135640',
    'DealAmtIndex': {
      'median': 30000,
      'percentType': 1,
      'left': '1',
      'leftUnit': '万',
      'leftPrefix': '￥',
      'dataType': 'index_range',
      'rightPrefix': '￥',
      'rightUnit': '万',
      'range': '10000.0 ~ 50000.0',
      'right': '5',
      'separator': '~'
    }
  },
  {
    'RankVary': 0,
    'BrandName': '雅迪',
    'PVIndex': {
      'median': 62500,
      'percentType': 1,
      'left': '5',
      'leftUnit': '万',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '万',
      'range': '50000.0 ~ 75000.0',
      'right': '7.5',
      'separator': '~'
    },
    'DealProNumIndex': {
      'median': 33,
      'percentType': 1,
      'left': '10',
      'leftUnit': '',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '',
      'range': '10.0 ~ 50.0',
      'right': '50',
      'separator': '~'
    },
    'UVIndex': {
      'median': 17500,
      'percentType': 1,
      'left': '1',
      'leftUnit': '万',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '万',
      'range': '10000.0 ~ 25000.0',
      'right': '2.5',
      'separator': '~'
    },
    'BrandId': '480076',
    'DealAmtIndex': {
      'median': 30000,
      'percentType': 1,
      'left': '1',
      'leftUnit': '万',
      'leftPrefix': '￥',
      'dataType': 'index_range',
      'rightPrefix': '￥',
      'rightUnit': '万',
      'range': '10000.0 ~ 50000.0',
      'right': '5',
      'separator': '~'
    }
  },
  {
    'RankVary': 0,
    'BrandName': '小牛电动',
    'PVIndex': {
      'median': 37500,
      'percentType': 1,
      'left': '2.5',
      'leftUnit': '万',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '万',
      'range': '25000.0 ~ 50000.0',
      'right': '5',
      'separator': '~'
    },
    'DealProNumIndex': {
      'median': 10,
      'percentType': 1,
      'left': '5',
      'leftUnit': '',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '',
      'range': '5.0 ~ 10.0',
      'right': '10',
      'separator': '~'
    },
    'UVIndex': {
      'median': 5000,
      'percentType': 1,
      'left': '4,000',
      'leftUnit': '',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '',
      'range': '4000.0 ~ 6000.0',
      'right': '6,000',
      'separator': '~'
    },
    'BrandId': '198145',
    'DealAmtIndex': {
      'median': 30000,
      'percentType': 1,
      'left': '1',
      'leftUnit': '万',
      'leftPrefix': '￥',
      'dataType': 'index_range',
      'rightPrefix': '￥',
      'rightUnit': '万',
      'range': '10000.0 ~ 50000.0',
      'right': '5',
      'separator': '~'
    }
  },
  {
    'RankVary': 0,
    'BrandName': '台铃',
    'PVIndex': {
      'median': 37500,
      'percentType': 1,
      'left': '2.5',
      'leftUnit': '万',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '万',
      'range': '25000.0 ~ 50000.0',
      'right': '5',
      'separator': '~'
    },
    'DealProNumIndex': {
      'median': 24,
      'percentType': 1,
      'left': '10',
      'leftUnit': '',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '',
      'range': '10.0 ~ 50.0',
      'right': '50',
      'separator': '~'
    },
    'UVIndex': {
      'median': 17500,
      'percentType': 1,
      'left': '1',
      'leftUnit': '万',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '万',
      'range': '10000.0 ~ 25000.0',
      'right': '2.5',
      'separator': '~'
    },
    'BrandId': '1113885',
    'DealAmtIndex': {
      'median': 30000,
      'percentType': 1,
      'left': '1',
      'leftUnit': '万',
      'leftPrefix': '￥',
      'dataType': 'index_range',
      'rightPrefix': '￥',
      'rightUnit': '万',
      'range': '10000.0 ~ 50000.0',
      'right': '5',
      'separator': '~'
    }
  },
  {
    'RankVary': 0,
    'BrandName': '硕源',
    'PVIndex': {
      'median': 17500,
      'percentType': 1,
      'left': '1',
      'leftUnit': '万',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '万',
      'range': '10000.0 ~ 25000.0',
      'right': '2.5',
      'separator': '~'
    },
    'DealProNumIndex': {
      'median': 30,
      'percentType': 1,
      'left': '10',
      'leftUnit': '',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '',
      'range': '10.0 ~ 50.0',
      'right': '50',
      'separator': '~'
    },
    'UVIndex': {
      'median': 3000,
      'percentType': 1,
      'left': '2,000',
      'leftUnit': '',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '',
      'range': '2000.0 ~ 4000.0',
      'right': '4,000',
      'separator': '~'
    },
    'BrandId': '1164574',
    'DealAmtIndex': {
      'median': 30000,
      'percentType': 1,
      'left': '1',
      'leftUnit': '万',
      'leftPrefix': '￥',
      'dataType': 'index_range',
      'rightPrefix': '￥',
      'rightUnit': '万',
      'range': '10000.0 ~ 50000.0',
      'right': '5',
      'separator': '~'
    }
  },
  {
    'RankVary': 0,
    'BrandName': '立马',
    'PVIndex': {
      'median': 17500,
      'percentType': 1,
      'left': '1',
      'leftUnit': '万',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '万',
      'range': '10000.0 ~ 25000.0',
      'right': '2.5',
      'separator': '~'
    },
    'DealProNumIndex': {
      'median': 15,
      'percentType': 1,
      'left': '5',
      'leftUnit': '',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '',
      'range': '5.0 ~ 10.0',
      'right': '10',
      'separator': '~'
    },
    'UVIndex': {
      'median': 3000,
      'percentType': 1,
      'left': '2,000',
      'leftUnit': '',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '',
      'range': '2000.0 ~ 4000.0',
      'right': '4,000',
      'separator': '~'
    },
    'BrandId': '189524',
    'DealAmtIndex': {
      'median': 30000,
      'percentType': 1,
      'left': '1',
      'leftUnit': '万',
      'leftPrefix': '￥',
      'dataType': 'index_range',
      'rightPrefix': '￥',
      'rightUnit': '万',
      'range': '10000.0 ~ 50000.0',
      'right': '5',
      'separator': '~'
    }
  },
  {
    'RankVary': 0,
    'BrandName': '凤凰（Phoenix）',
    'PVIndex': {
      'median': 37500,
      'percentType': 1,
      'left': '2.5',
      'leftUnit': '万',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '万',
      'range': '25000.0 ~ 50000.0',
      'right': '5',
      'separator': '~'
    },
    'DealProNumIndex': {
      'median': 13,
      'percentType': 1,
      'left': '5',
      'leftUnit': '',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '',
      'range': '5.0 ~ 10.0',
      'right': '10',
      'separator': '~'
    },
    'UVIndex': {
      'median': 7000,
      'percentType': 1,
      'left': '6,000',
      'leftUnit': '',
      'leftPrefix': '',
      'dataType': 'index_range',
      'rightPrefix': '',
      'rightUnit': '',
      'range': '6000.0 ~ 8000.0',
      'right': '8,000',
      'separator': '~'
    },
    'BrandId': '156969',
    'DealAmtIndex': {
      'median': 30000,
      'percentType': 1,
      'left': '1',
      'leftUnit': '万',
      'leftPrefix': '￥',
      'dataType': 'index_range',
      'rightPrefix': '￥',
      'rightUnit': '万',
      'range': '10000.0 ~ 50000.0',
      'right': '5',
      'separator': '~'
    }
  }
])

// 按照 DealAmtIndex.median 降序排列，如果相同则按 DealProNumIndex.median 降序
const topTenData = computed(() => {
  return [...topTenDataRaw.value].sort((a, b) => {
    // 首先按 DealAmtIndex.median 降序
    const dealAmtDiff = b.DealAmtIndex.median - a.DealAmtIndex.median
    if (dealAmtDiff !== 0) {
      return dealAmtDiff
    }
    // 如果 DealAmtIndex.median 相同，则按 DealProNumIndex.median 降序
    return b.DealProNumIndex.median - a.DealProNumIndex.median
  })
})

const yDataNames = computed(() => {
  return topTenData.value ? topTenData.value.map((item: any) => item.BrandName) : []
})
const seriesData = computed(() => {
  return topTenData.value ? topTenData.value.map((item: any) => item.DealProNumIndex.median) : []
})

const chartRef = ref()
const rankColors = ['#FD6B6A', '#FE831F', '#FEFD29'] // 1=红, 2=橙, 3=青
// 图表配置
const option = ref({
  grid: {
    left: 200,
    right: 40,
    top: 0,
    bottom: 10
  },
  xAxis: {
    type: 'value',
    show: false
  },
  yAxis: {
    type: 'category',
    data: yDataNames,
    // data: ['小牛电动车', '九号Ninebot', '爱玛AIMA', '雅迪', '飞鸽', '立马', '立马1', '立马2', '立马3', '立马4'],
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
      data: seriesData,
      // data: [5334, 3232, 2645, 2343, 2080, 1767, 1767, 1767, 1767, 1767],
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

function startHighlightLoop(_chart: any) {
  // 高亮循环功能可以在这里实现
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
  height: 250px;
  padding-left: 10px;
}
</style>
