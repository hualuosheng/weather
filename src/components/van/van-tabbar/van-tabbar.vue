<template>
  <!-- 底部tabbar 区 -->
  <view class="flex-box flex-between border-t van-tabbar">
    <button class="fs32 no-border btn" @click="serviceDoct()">{{ buttonTitle }}</button>
    <slot />
  </view>
</template>

<script>
export default {
  name: 'van-tabbar',
  data() {
    return {}
  },
  props: {
    buttonTitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.van-tabbar {
  position: fixed;
  z-index: 99;
  bottom: 0;
  padding: 0 32rpx;

  // ios底部安全距离-padding
  bottom: constant(safe-area-inset-bottom);
  bottom: env(safe-area-inset-bottom);
  bottom: var(--window-bottom);
  left: 0;
  width: 100%;
  height: 100rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #fff;
  &::after {
    border-color: rgb(0 0 0 / 33%);
  }
  .van-icon-heart {
    background-image: -webkit-linear-gradient(360deg, #f33, #ff653f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .btn {
    width: 520rpx;
    height: 70rpx;
    margin: 0;
    border-radius: 35rpx;
  }
}
</style>
