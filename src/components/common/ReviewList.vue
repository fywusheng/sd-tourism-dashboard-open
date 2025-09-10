<template>
  <div class="review-list">
    <div v-for="(item, index) in reviews" :key="index" class="review-item">
      <!-- 左边名称 -->
      <div class="name">{{ item.name }}</div>

      <!-- 中间星级 -->
      <div class="stars">
        <span v-for="n in maxStars" :key="n" class="star" :class="{ active: n <= item.stars }">★</span>
      </div>

      <!-- 右边评论 -->
      <div class="comment">{{ formatComment(item.comment) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Review {
  name: string
  stars: number
  comment: string
}

const props = defineProps<{
  reviews: Review[]
  maxStars?: number
}>()

const maxStars = props.maxStars ?? 5

// 限制评论字数，超过20个字加省略号
const formatComment = (text: string) => {
  return text.length > 20 ? text.slice(0, 20) + '…' : text
}
</script>

<style scoped>
.review-list {
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-size: 12px;
  color: #fff;
  padding-bottom: 10px;
  /* height: 106px;
  overflow-y: auto; */
}

.review-item {
  display: flex;
  align-items: center;
  gap: 9px;
}

.name {
  width: 74px;
  text-align: right;
  flex-shrink: 0;
}

.stars {
  display: flex;
  gap: 4px;
  color: #ccc;
  min-width: 100px;
}

.star {
  font-size: 14px;
  color: #666;
}

.star.active {
  color: #ff4d4f;
}

.comment {
  flex: 1;
  color: #5dffee;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
