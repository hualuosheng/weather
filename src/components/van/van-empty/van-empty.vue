<template>
  <view class="van-empty" v-if="show" :style="emptyStyle">
    <image
      class="van-image"
      :src="src"
      mode="aspectFill"
      :style="emptyImgStyle"
    />
    <view class="van-empty--tips">{{ tips }}</view>
    <view class="van-slot-wrap">
      <slot name="bottom"></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'van-empty',
  props: {
    // 图标路径
    src: {
      type: String,
      default: ''
    },
    // 提示文字
    tips: {
      type: String,
      default: ''
    },
    //背景颜色
    bgColor: {
      type: String,
      default: ''
    },
    // 文字颜色
    color: {
      type: String,
      default: '#c0c4cc'
    },
    // 文字大小，单位rpx
    fontSize: {
      type: [String, Number],
      default: 26
    },
    // 图标宽度,单位rpx
    imgWidth: {
      type: [String, Number],
      default: 240
    },
    // 图标高度，单位rpx
    imgHeight: {
      type: [String, Number],
      default: 240
    },
    // 是否显示组件
    show: {
      type: Boolean,
      default: true
    },
    // 组件距离上一个元素之间的距离
    marginTop: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    emptyStyle() {
      return `background:${this.bgColor};margin-top: ${this.marginTop} + rpx`
    },
    emptyImgStyle() {
      return `width: ${this.imgWidth}rpx;height: ${this.imgHeight}rpx;`
    }
  }
}
</script>

<style lang="scss" scoped>
.van-empty {
  @include vue-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.van-empty--tips {
  margin-top: 30rpx;
  text-align: center;
}

.van-slot-wrap {
  @include vue-flex;
  justify-content: center;
  align-items: center;
  margin-top: 20rpx;
}
</style>
