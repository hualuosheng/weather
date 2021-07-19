<template>
  <!-- 浮动之后占位 -->
  <view class="van-fixed-area">
    <!--浮动区 -->
    <view class="van-fixed-area__bottom" :class="{ 'border-t': isBorder }" :style="[vanAreaStyle]">
      <slot />
    </view>
  </view>
</template>
<script>
export default {
  name: 'van-fixed-area',
  data() {
    return {}
  },
  props: {
    //背景色
    bgColor: {
      type: String,
      default: ''
    },
    //距离底部区域
    bottom: {
      type: [Number, String],
      default: 0
    },
    //是否添加上边框
    isBorder: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    vanAreaStyle() {
      let style = {
        bottom: this.bottom,
        background: this.bgColor
      }
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
/* 浮动之后占位 */
.van-fixed-area {
  height: 50px;
  margin-top: 28rpx;
}
.van-fixed-area__bottom {
  position: fixed;
  z-index: 998;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0 28rpx;
}
</style>
