<template>
  <view class="scale">
    <view class="scale-item" v-for="index in 10" :key="index">
      {{ index }}
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.scale {
  font-size: 20rpx;
  display: flex;
  justify-content: space-between;
  height: 64rpx;
  line-height: 64rpx;
  margin: 16rpx 0;
  color: #fff;
  background: linear-gradient(90deg, #ef5c5c 0%, #85ca00 47.92%, #40d293 100%);
  /* background: linear-gradient(
    90deg,
    rgba(239, 92, 92, 0.2) 0%,
    rgba(133, 202, 0, 0.2) 47.92%,
    rgba(64, 210, 147, 0.2) 100%
  ); */
}

.scale-item {
  position: relative;
  display: flex;
  justify-content: center;
  width: 78rpx;
  height: 100%;
  text-align: center;
}
.scale-item::before,
.scale-item::after {
  position: absolute;
  width: 1px;
  height: 20rpx;
  content: '';
  transform: scaleX(50%);
  background-color: #fff;
}
.scale-item::before {
  top: 9;
}
.scale-item::after {
  bottom: 0;
}
.scale-item:last-child,
.scale-item:first-child {
  width: 50rpx;
}
.num {
  line-height: 28rpx;
}
</style>
