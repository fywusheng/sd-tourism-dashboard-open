<!-- 用户评价 -->
<template>
  <CPanel class="age-distribution" :height="178">
    <template #header>用户评价</template>
    <template #content>
      <ReviewList :reviews="data" />
    </template>
  </CPanel>
</template>

<script setup lang="ts">
import { onMounted, inject, computed } from 'vue'
import CPanel from '@/components/common/CPanel.vue'
import ReviewList from '@/components/common/ReviewList.vue'
const latestReviews: any = inject('latestReviews')

const data = computed(() => {
  return latestReviews.value
    ? latestReviews.value.map((item: any) => {
        return {
          name: item.userNickName,
          stars: item.commentScore,
          comment: item.commentData
        }
      })
    : []
})

// const data = [
//   { name: '美好时代', stars: 5, comment: '价格实惠，送货及时,服务态度好！' },
//   { name: '小小团子', stars: 5, comment: '价格实惠，送货及时,服务态度好！' },
//   { name: '富贵珍珠', stars: 4, comment: '价格实惠，送货及时,服务态度好！' },
//   { name: '一抹香味', stars: 4, comment: '价格实惠，送货及时,服务态度好！' },
//   { name: '阳光大道', stars: 5, comment: '展示20个字以内，剩余的用省略号代替展示效果' }
// ]
onMounted(() => {})
</script>
<style lang="scss" scoped></style>
