<template>
  <view class="van-float-menu" v-if="value">
    <view class="van-float-menu__item border-b" v-for="(item, index) in list" :key="index">
      <van-icons size="54" :type="item.type" color="#579bfe" />
      <text class="van-float-menu__item-text">
        {{ item.name }}
      </text>
    </view>
  </view>
</template>
<script>
export default {
  name: 'van-float-menu',
  props: {
    //渲染列表
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    //
    name: {
      type: String,
      default: ''
    },
    //是否显示
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.van-float-menu {
  font-size: 36rpx;
  position: fixed;
  top: var(--window-top);
  top: 148rpx;
  right: 64rpx;
  border-radius: 10rpx;
  background-color: #fff;
  box-shadow: 0 0 7px 0 #bcbcbc;
  &::after {
    position: absolute;
    z-index: 66;
    top: -12rpx;
    right: 36rpx;
    width: 0;
    height: 0;
    content: '';
    transform: rotate(225deg);
    border: 14rpx solid #fff;
    border-top: 14rpx solid transparent;
    border-left: 14rpx solid transparent;
    border-bottom-right-radius: 8rpx;
    box-shadow: 1px 1px 1px 0 #bcbcbc;
    overflow: hidden;
  }
  &__item {
    display: flex;
    align-items: center;
    padding: 28rpx 48rpx;
  }
  &__item-text {
    padding-left: 32rpx;
  }
}
</style>
