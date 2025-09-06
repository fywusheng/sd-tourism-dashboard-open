<!-- 通用面板 -->
<template>
  <div
    class="panel"
    :style="{ height: props.height ? (typeof props.height === 'number' ? props.height + 'px' : props.height) : '100%' }"
  >
    <div class="panel-header">
      <slot name="header">默认名称</slot>
    </div>
    <div class="panel-container">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  height?: string | number
}>()
</script>

<style lang="scss" scoped>
.panel {
  position: relative;
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  // gap: 12px;
  // padding-bottom: 24px;
  background: url('@/assets/img/border.png') no-repeat center center;
  background-size: 100% 100%;
  margin-bottom: 10px;
  &-header {
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    // justify-content: center;
    // background: url('@/assets/images/titleBg.png') no-repeat center center;
    // background-size: 100% 100%;
    font-size: 20px;
    letter-spacing: 1px;
    gap: 8px;
    color: #ffffff;
    text-shadow: 0px 0px 18px rgba(0, 84, 255, 0.89);
    font-weight: bold;
    font-size: 16px;
    padding-left: 13px;
    &::before {
      content: '';
      position: relative;
      width: 19px;
      height: 3px;
      background: #fffc2a;
      display: block;
    }
  }
  &-container {
    position: relative;
    flex: 1;
    // background: url('@/assets/images/panelBottomBg.png') no-repeat center bottom;
    background-size: 100% 100%;
    // padding: 0 24px;
    box-sizing: border-box;
    padding-right: 10px;
  }
}
</style>
