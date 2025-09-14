<!-- 运行时长 -->
<template>
  <CPanel :height="163">
    <template #header>运行时长</template>
    <template #content>
      <div class="gauge-container">
        <div class="gauge-item">
          <!-- <CEcharts ref="chartRef1" :option="gaugeOption1" /> -->
          <div class="gauge-content">
            <span class="value">{{ totalRunningDuration }}</span>
            <div class="pie"></div>
          </div>

          <div class="gauge-title">运行时长 (h)</div>
        </div>
        <div class="gauge-item">
          <div class="gauge-content">
            <span class="value average">{{ averageUsageDuration }}</span>
            <div class="pie"></div>
          </div>
          <!-- <CEcharts ref="chartRef2" :option="gaugeOption2" /> -->
          <div class="gauge-title">平均使用时长 (min)</div>
        </div>
      </div>
    </template>
  </CPanel>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, inject } from 'vue'
import CPanel from '@/components/common/CPanel.vue'
const rightPanelData: any = inject('rightPanelData', ref({}))

// 运行时长
const totalRunningDuration = computed(() => {
  const value = rightPanelData?.value?.totalRunningDuration
  return value
})
// 平均使用时长
const averageUsageDuration = computed(() => {
  const value = rightPanelData?.value?.averageUsageDuration
  return value
})

onMounted(() => {
  // 组件挂载后的逻辑
})
</script>
<style lang="scss" scoped>
.gauge-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;

  .gauge-item {
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .gauge-content {
      // width: 101px;
      height: 63px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: relative;
      .pie {
        width: 101px;
        height: 63px;
        background: url('@/assets/img/pie.png') no-repeat center center;
        background-size: 100% 43px;
        background-position: center bottom;
        text-align: center;
      }
      .value {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 0;
        font-weight: bold;
        font-size: 30px;
        display: inline-block;
        background: -webkit-linear-gradient(top, #ffffff, #fefc28);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
        &.average {
          background: -webkit-linear-gradient(top, #ffffff, #5dffee);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
      }
    }

    &:first-child {
      margin-right: 16px;
    }

    .gauge-title {
      color: #fff;
      font-size: 12px;
      text-align: center;
      white-space: nowrap;
      margin-top: 7px;
    }
  }
}
</style>
