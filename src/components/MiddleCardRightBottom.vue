<template>
  <div class="card-content">
    <!-- 在此处添加中间内容 -->
    <div class="card-left">
      <div class="title">{{ corePanelData.todayActivatedUsers }}</div>
      <div class="subtitle">今日新增激活用户</div>
    </div>
    <van-circle
      v-model:current-rate="currentRate"
      :rate="rate"
      start-position="bottom"
      color="#5DFFEE"
      layer-color="#001D69"
      :stroke-width="60"
    >
      <template #default>
        <div class="rate-inner">
          <div>
            <div class="rate-inner-title">{{ corePanelData.activationRate }}%</div>
            <div class="rate-inner-subTitle">日均激活</div>
          </div>
        </div>
      </template>
    </van-circle>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
const currentRate = ref(0) // 当前进度
const rate = computed(() => {
  return corePanelData.value.activationRate
}) // 这里可以根据需要调整百分比
const corePanelData = inject('corePanelData') as any
</script>

<style lang="scss" scoped>
.card-content {
  position: absolute;
  bottom: 247px;
  right: 464px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 14px 24px 7px 30px;
  background-image: url('@/assets/img/card-bg.png');
  background-size: 100% 100%;
  .card-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    .title {
      font-family: Microsoft YaHei;
      font-weight: bold;
      font-size: 30px;
      font-weight: bold;
      display: inline-block;
      background: -webkit-linear-gradient(top, #ffffff, #5dffee);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
      text-align: center;
    }
  }

  .rate-inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Microsoft YaHei;
    color: #ffffff;
    text-align: center;
    &-title {
      font-size: 18px;
      line-height: 24px;
    }
    &-subtitle {
      font-size: 12px;
      line-height: 22px;
    }
  }
}
</style>
