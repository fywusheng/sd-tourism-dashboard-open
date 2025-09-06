<!-- 左侧数据面板 -->
<template>
  <div class="left-panel">
    <!-- 左上角标题 -->
    <div class="title">
      <img src="@/assets/img/fly.png" />
      <img src="@/assets/img/saving.png" />
    </div>
    <!-- 品牌电动车京东销量TOP10 -->
    <rankingOfScenicSpots />
    <!-- 用户评价 -->
    <ageDistribution />
    <!-- 本月各省销售概况 -->
    <receptionOfTourists />
  </div>
</template>

<script setup lang="ts">
import rankingOfScenicSpots from './leftPanel/rankingOfScenicSpots.vue'
import ageDistribution from './leftPanel/ageDistribution.vue'
import receptionOfTourists from './leftPanel/receptionOfTourists.vue'
</script>

<style lang="scss" scoped>
.left-panel {
  position: absolute;
  width: 430px;
  height: 100%;
  left: 0;
  top: 0;
  // display: grid;
  // gap: 10px;
  padding: 46px 0 34px 16px;
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
