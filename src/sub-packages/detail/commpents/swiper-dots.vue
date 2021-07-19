<template>
  <view class="swiper-dots">
    <text class="num dot">{{
      swiperLength !== 0 ? swiperCurrent + 1 : 0
    }}</text>
    <text class="sign">/</text>
    <text class="num">{{ swiperLength }}</text>
  </view>
</template>

<script>
export default {
  name: 'swiper-dots',
  props: {
    swiperCurrent: {
      type: Number,
      default: -1
    },
    swiperLength: {
      type: Number,
      default: -1
    }
  }
}
</script>

<style scoped>
.swiper-dots {
  width: 124rpx;
  height: 52rpx;
  right: 32rpx;
  bottom: 60rpx;
  position: absolute;
  background: rgba(0, 0, 0, 0.24);
  font-size: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 48rpx;

}
.sign {
  padding: 0 2px;
  /* transform: translateX(-50%); */
}
</style>
