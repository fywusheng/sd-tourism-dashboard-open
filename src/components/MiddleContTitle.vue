<template>
  <div class="middle-content">
    <!-- 在此处添加中间内容 -->
    <div class="title">碳减排统计</div>
    <div class="cont">
      <div class="card-item">
        <div class="value">{{ corePanelData.todayCarbonReduction }}KG</div>
        <div class="subtitle">当日累计</div>
      </div>
      <div class="card-item">
        <div class="value total">{{ corePanelData.totalCarbonReduction }}T</div>
        <div class="subtitle">总累计</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
const corePanelData = inject('corePanelData') as any
</script>

<style lang="scss" scoped>
.middle-content {
  font-family: Microsoft YaHei;
  position: absolute;
  top: 87px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 12;
  .title {
    font-weight: bold;
    font-size: 30px;
    color: #ffffff;
    line-height: 49px;
    background: -webkit-linear-gradient(top, #ffffff, #5dffee);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }
  .cont {
    width: 419px;
    height: 72px;
    background: url('@/assets/img/title-bg.png') no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .card-item {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .value {
        font-weight: bold;
        font-size: 24px;
        line-height: 33px;
        background: -webkit-linear-gradient(top, #ffffff, #fffc27);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
        &.total {
          background: -webkit-linear-gradient(top, #ffffff, #45ff86);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
      }
      .subtitle {
        font-weight: 400;
        font-size: 18px;
        color: #ffffff;
      }
    }
  }
}
</style>
