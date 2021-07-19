<template>
  <view class="van-location" @click="_onClick">
    <van-icons type="location" />
    <text> {{ text }}</text>
    <van-icons type="arrow-right" />
  </view>
</template>

<script>
export default {
  name: 'van-location',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    _onClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.van-location {
  font-size: 30rpx;
  padding: 0 32rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
}
</style>
