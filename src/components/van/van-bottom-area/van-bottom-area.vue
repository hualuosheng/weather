<template>
  <!-- 底部浮动区 -->
  <view class="van-bottom-area">
    <view class="van-bottom-area__fixed" :class="{ 'border-t': showBorder }" :style="{ background: bgColor }">
      <slot />
    </view>
  </view>
</template>

<script>
export default {
  name: 'van-bottom-area',
  data() {
    return {}
  },
  props: {
    bgColor: {
      type: String,
      default: ''
    },
    showBorder: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.van-bottom-area {
  // padding-bottom: 0;
  // padding-bottom: constant(safe-area-inset-bottom);
  // padding-bottom: env(safe-area-inset-bottom);
  height: 100rpx;
  // height: var(--window-bottom);
}

.van-bottom-area__fixed {
  position: fixed;
  z-index: 998;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100rpx;
  padding: 0 32rpx;
  padding-bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
