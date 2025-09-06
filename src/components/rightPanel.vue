<!-- 右侧数据面板 -->
<template>
  <div class="right-panel">
    <!-- 左上角标题 -->
    <div class="title">
      <img src="@/assets/img/green.png" />
      <img src="@/assets/img/ride.png" />
    </div>
    <!-- 运行时长 -->
    <industryRevenue />
    <!-- 车辆使用时长  省排行榜 -->
    <top5Tourists />
    <!-- 今日低碳出行TOP20 -->
    <realTimeHotWords />
  </div>
</template>

<script setup lang="ts">
import industryRevenue from './rightPanel/industryRevenue.vue'
import top5Tourists from './rightPanel/top5Tourists.vue'
import realTimeHotWords from './rightPanel/realTimeHotWords.vue'
</script>

<style lang="scss" scoped>
.right-panel {
  position: absolute;
  width: 430px;
  height: 100%;
  right: 0;
  top: 0;
  // display: grid;
  // gap: 24px;
  padding: 46px 0 24px 0;
  box-sizing: border-box;
  // grid-template-columns: 1fr;
  // grid-template-rows: repeat(3, 1fr);
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 400px;
    height: 40px;
    margin-bottom: 10px;
    img {
      height: 40px;
      width: auto;
    }
  }
}
</style>
