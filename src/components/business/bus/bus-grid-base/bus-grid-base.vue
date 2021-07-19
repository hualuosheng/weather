<template>
  <view class="bus-grid-base" :class="{ 'is-radius': radius }">
    <view
      class="flex-box flex-column van-item"
      v-for="(item, index) in gridList"
      :key="index"
      @click="openPage(item.to)"
      :style="girdIemStyle"
    >
      <image
        class="van-item-img"
        :src="item.src"
        :lazy-load="true"
        mode="aspectFit"
        :style="[imgStyle]"
      ></image>
      <view class="van-item--title">
        {{ item.title }}
      </view>
    </view>
  </view>
</template>
<script scoped>
export default {
  name: 'mCard',
  props: {
    gridList: {
      type: Array,
      default: () => {
        return []
      }
    },
    column: {
      type: [Number, String],
      default: 4
    },
    imgWidth: {
      type: [Number, String],
      default: '96'
    },
    bgColor: {
      type: String,
      default: '96'
    },
    //文字与图片之间的间隙
    spacing: {
      type: [Number, String],
      default: ''
    },
    radius: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    girdIemStyle() {
      return this.gridList.length <= 4
        ? 'flex: 1'
        : `width: ${100 / this.column}%`
    },
    imgStyle() {
      return `width:${this.imgWidth}rpx;margin-bottom:${this.spacing}rpx`
    }
  },
  data() {
    return {}
  }
}
</script>
<style scoped>
.bus-grid-base {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  padding: 0 16rpx;
  position: relative;
  z-index: 88;
  overflow: hidden;
}

.is-radius {
  border-radius: 24rpx 24rpx 0 0;
  margin-top: -24rpx;
}
.van-item {
  height: 140rpx;
  margin: 16rpx 0;
  /* flex: 1 1 0%; */
}
</style>
