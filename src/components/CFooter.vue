<!-- 底部数据展示组件 -->
<template>
  <footer class="data-footer">
    <!-- 数据卡片区域 -->
    <div class="data-cards">
      <div class="data-card" v-for="(item, index) in dataItems" :key="index">
        <div class="card-title">{{ item.title }}</div>
        <div class="card-value">{{ item.value }}</div>
      </div>
      <div class="text-desc">此处为所展示地理位置简要文字性介绍</div>
    </div>

    <!-- 底部说明区域 -->
    <div class="footer-info">
      <!-- <div class="main-text">此处为所展示地理位置简要文字性介绍</div> -->
      <div class="sub-text">
        <span class="copyright">版权所有：飞鸽公司</span>
        <span class="tech-support">技术支持：xxx技术有限公司</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 数据项配置
const dataItems = ref([
  {
    title: '2025年总销量（万台）',
    value: '456'
  },
  {
    title: '2025年总运行时长（万小时）',
    value: '108.4'
  },
  {
    title: '2025年总激活量（万台）',
    value: '12345'
  }
])
</script>

<style lang="scss" scoped>
.data-footer {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 288px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 60px 24px;
  box-sizing: border-box;
}

.data-cards {
  display: flex;
  justify-content: space-center;
  align-items: center;
  flex: 1;
  width: 800px;
  height: 114px;
  background: url('@/assets/img/bottom-border.png') no-repeat center center;
  background-size: 100% 100%;
  position: relative;
  .text-desc {
    position: absolute;
    left: 74px;
    bottom: 18px;
    color: #ffffff;
    font-size: 14px;
    letter-spacing: 1px;
    width: 651px;
    height: 39px;
    background: url('@/assets/img/text-border.png') no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.data-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 212px;
  height: 100px;
  background: url('@/assets/img/sale-border.png') no-repeat center center;
  background-size: 100% 100%;
  &:first-child {
    margin-left: 72px;
  }
  &:nth-child(2),
  &:nth-child(3) {
    margin-left: 8px;
  }
}

.card-title {
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 1px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-value {
  font-size: 36px;
  font-weight: bold;
  font-family: Microsoft YaHei;
  letter-spacing: 2px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: -webkit-linear-gradient(top, #ffffff, #5dffee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

.footer-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-top: 20px;
}

.main-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 1px;
}

.sub-text {
  display: flex;
  align-items: center;
  gap: 40px;
  color: #ffffff;
  font-size: 13px;

  .copyright,
  .tech-support {
    position: relative;
  }

  .copyright::after {
    content: '';
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 12px;
    background: rgba(255, 255, 255, 0.3);
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .data-footer {
    padding: 24px 40px 20px;
    height: 260px;
  }

  .data-card {
    min-width: 250px;
    padding: 16px;
  }

  .card-value {
    font-size: 40px;
  }
}

@media (max-width: 768px) {
  .data-footer {
    padding: 20px 24px 16px;
    height: 240px;
  }

  .data-cards {
    flex-direction: column;
    gap: 20px;
  }

  .data-card {
    min-width: auto;
    width: 100%;
    padding: 12px;
  }

  .card-value {
    font-size: 32px;
  }

  .sub-text {
    flex-direction: column;
    gap: 8px;

    .copyright::after {
      display: none;
    }
  }
}
</style>
