<template>
  <view class="van-grid-base" :style="girdStyle">
    <view
      class="flex-box flex-column van-item"
      v-for="(item, index) in list"
      :key="index"
      @click="openPage(item.to)"
      :style="girdIemStyle"
    >
      <slot />
      <image
        class="van-item-img"
        v-if="item.src"
        :src="item.src"
        :lazy-load="true"
        mode="aspectFit"
        :style="imgStyle"
      ></image>
      <view class="van-item--title">
        {{ item.title }}
      </view>
    </view>
  </view>
</template>
<script scoped>
export default {
  name: 'van-grid-base',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    column: {
      type: [Number, String],
      default: '4'
    },
    //图片宽度
    width: {
      type: [Number, String],
      default: '96'
    },
    //图片高度
    height: {
      type: [Number, String],
      default: '96'
    },
    bgColor: {
      type: String,
      default: ''
    },
    //文字与图片之间的间隙
    spacing: {
      type: [Number, String],
      default: '32'
    },
    radius: {
      type: [String, Boolean],
      default: false
    },
    size: {
      type: [Number, String],
      default: ''
    }
  },
  computed: {
    girdIemStyle() {
      return `width: ${100 / this.column}%`
    },
    girdStyle() {
      let style = {}
      if (this.radius) style.borderRadius = `24rpx 24rpx 0 0;`
      if (this.size) style.fontSize = this.size + 'rpx'
      return style
    },
    imgStyle() {
      return `height:${this.height}rpx;margin-bottom:${this.spacing}rpx;width:${this.width}rpx;`
    }
  }
}
</script>
<style scoped>
.van-grid-base {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  padding: 16rpx 0;
}

.van-item {
  margin: 16rpx 0;
}
</style>
