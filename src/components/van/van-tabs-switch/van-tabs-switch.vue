<template>
  <view class="van-tabs-switch">
    <view
      class="flex-box van-tabs-switch--item"
      v-for="(item, index) in list"
      :key="index"
      :style="[tabStyle(index)]"
      @click="_onClick(index)"
      >{{ item }}</view
    >
    <view class="move-back" :style="moveStyle"></view>
  </view>
</template>

<script>
export default {
  name: 'van-tabs-switch',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    tabStyle: function() {
      return index => {
        let num = this.value == index ? 1 : 0.4
        return `opacity: ${num}`
      }
    },
    moveStyle() {
      let distance = this.value == 0 ? 0 : 196
      return `left:${distance}rpx`
    }
  },
  methods: {
    _onClick(index) {
      this.$emit('input', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.van-tabs-switch {
  position: relative;
  display: flex;
  overflow: hidden;
  width: 400rpx;
  height: 60rpx;
  border: 2px solid #3877e1;
  border-radius: 60rpx;
  background-color: #3877e1;
  &--item {
    position: relative;
    z-index: 2;
    flex: 1;
    opacity: 0.8;
  }
  .move-back {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: calc(50% - 4rpx);
    height: 100%;
    transition: all 300ms;
    border-radius: 52rpx;
    background-color: #4086ff;
  }
}
</style>
