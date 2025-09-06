<template>
  <div class="middle-content">
    <!-- 在此处添加中间内容 -->
    <div class="title">全国飞鸽绿色出行动态</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
</script>

<style lang="scss" scoped>
.middle-content {
  position: absolute;
  top: 109px;
  left: 466px;
  display: flex;
  align-items: center;
  .title {
    font-weight: bold;
    font-size: 16px;
    color: #ffffff;
    height: 50px;
    text-shadow: 0px 0px 18px rgba(0, 84, 255, 0.89);
    display: flex;
    align-items: center;
    &::before {
      content: '';
      display: inline-block;
      width: 19px;
      height: 3px;
      background: #fffc2a;
      margin-right: 8px;
    }
  }
}
</style>
