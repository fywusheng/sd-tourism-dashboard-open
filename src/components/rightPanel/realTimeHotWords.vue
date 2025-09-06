<!-- 今日低碳出行TOP20  -->
<template>
  <CPanel :height="283">
    <template #header>今日低碳出行TOP20</template>
    <template #content>
      <div class="ranking-list">
        <div v-for="(item, index) in rankingData" :key="index" class="ranking-item" :class="{ 'top-three': index < 3 }">
          <div class="ranking-number">{{ String(index + 1).padStart(2, '0') }}</div>
          <div class="user-avatar">
            <!-- <img :src="item.avatar" :alt="item.name" /> -->
          </div>
          <div class="user-info">
            <span class="user-name">{{ item.name }}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: item.percentage + '%' }"></div>
          </div>
          <div class="duration">{{ item.duration }} min</div>
        </div>
      </div>
    </template>
  </CPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CPanel from '@/components/common/CPanel.vue'

// 模拟头像数据 - 实际项目中应该使用真实的头像图片
const avatars = [
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGRjZEMDAiLz4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+CjxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjE2IiBmaWxsPSIjRkY2RDAwIi8+CjwvY2lyY2xlPgo8L3N2Zz4K',
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGRkM4MDAiLz4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+CjxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjE2IiBmaWxsPSIjRkZDODAwIi8+CjwvY2lyY2xlPgo8L3N2Zz4K',
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGRkVEMDAiLz4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+CjxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjE2IiBmaWxsPSIjRkZFRDAwIi8+CjwvY2lyY2xlPgo8L3N2Zz4K',
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM0RkI5RkYiLz4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+CjxjaXJjbGUgY3g9IjE2IiBjeT0iMTYiIHI9IjE2IiBmaWxsPSIjNEZCOUZGIi8+CjwvY2lyY2xlPgo8L3N2Zz4K'
]

const rankingData = ref([
  { name: '省+娃氏', duration: 112, percentage: 100, avatar: avatars[0] },
  { name: '山西-昊磊', duration: 110, percentage: 98, avatar: avatars[1] },
  { name: '四川-白富美', duration: 100, percentage: 89, avatar: avatars[2] },
  { name: '向阳花', duration: 90, percentage: 80, avatar: avatars[3] },
  { name: '开心果', duration: 89, percentage: 79, avatar: avatars[0] },
  { name: '独来独往', duration: 70, percentage: 63, avatar: avatars[1] },
  { name: '齐天大圣', duration: 60, percentage: 54, avatar: avatars[2] },
  { name: '江南首富', duration: 50, percentage: 45, avatar: avatars[3] }
])
</script>

<style lang="scss" scoped>
::v-deep .panel-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ranking-list {
  position: relative;
  width: 100%;
  height: 240px;
  overflow-y: auto;
  padding: 8px 12px;
  box-sizing: border-box;

  // &::-webkit-scrollbar {
  //   width: 4px;
  // }

  // &::-webkit-scrollbar-track {
  //   background: rgba(255, 255, 255, 0.1);
  //   border-radius: 2px;
  // }

  // &::-webkit-scrollbar-thumb {
  //   background: rgba(103, 224, 227, 0.5);
  //   border-radius: 2px;
  // }
}

.ranking-item {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  margin-bottom: 8px;
  // background: linear-gradient(90deg, rgba(103, 224, 227, 0.1) 0%, rgba(103, 224, 227, 0.05) 100%);
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, rgba(103, 224, 227, 0.2) 0%, rgba(103, 224, 227, 0.1) 100%);
    transform: translateX(2px);
  }

  // &.top-three {
  //   background: linear-gradient(90deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0.05) 100%);

  //   &:hover {
  //     background: linear-gradient(90deg, rgba(255, 215, 0, 0.25) 0%, rgba(255, 215, 0, 0.1) 100%);
  //   }

  //   .ranking-number {
  //     color: #ffffff;
  //     font-weight: bold;
  //     font-size: 12px;
  //   }
  // }
}

.ranking-number {
  color: #67e0e3;
  font-size: 12px;
  font-weight: 600;
  width: 24px;
  text-align: center;
  margin-right: 12px;
}

.user-avatar {
  width: 24px;
  height: 24px;
  margin-right: 12px;
  background-color: #5cffec;

  // img {
  //   width: 100%;
  //   height: 100%;
  //   border-radius: 50%;
  //   object-fit: cover;
  // }
}

.user-info {
  flex: 1;
  margin-right: 12px;

  .user-name {
    color: #ffffff;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.progress-bar {
  flex: 2;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin-right: 12px;
  overflow: hidden;

  .progress-fill {
    height: 100%;
    background: linear-gradient(270deg, #5cffec 0%, rgba(94, 254, 238, 0) 100%);
    border-radius: 4px;
    transition: width 0.6s ease;
  }
}

.duration {
  color: #67e0e3;
  font-size: 12px;
  font-weight: 600;
  width: 50px;
  text-align: right;
}
</style>
