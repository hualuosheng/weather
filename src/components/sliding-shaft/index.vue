<template>
  <view class="sliding-shaft">
    <view v-for="(item, index) in list" :key="index" class="shaft-item">
      <text class="value">{{ item.value }}</text>
      <text class="label">{{ item.label }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {}
}
</script>

<style scoped>
.sliding-shaft {
  display: flex;
  overflow-y: auto;
  flex-wrap: nowrap;
}
.shaft-item {
  display: flex;
  align-items: center;
  flex-flow: column;
  flex-shrink: 0;
  justify-content: center;
  width: 180rpx;
  height: 100rpx;
  padding: 8rpx 0;
  border: 1px solid #f4f4f4;
  border-radius: 12rpx;
}
.shaft-item:not(:last-child) {
  margin-right: 10px;
}
.value {
  font-size: 40rpx;
  line-height: 56rpx;
}

.label {
  font-size: 20rpx;
  line-height: 28rpx;
}
</style>
