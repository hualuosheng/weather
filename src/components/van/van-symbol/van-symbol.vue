<template>
  <view class="van-symbol" :class="{ fw600: bold }" :style="[symbolStyle]">{{ symbol[type] }}</view>
</template>

<script>
import symbol from './symbol'

export default {
  data() {
    return {
      symbol: symbol
    }
  },
  props: {
    color: {
      type: String,
      default: ''
    },
    size: {
      type: [Number, String],
      default: '24'
    },
    //是否加粗
    bold: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    symbolStyle() {
      let style = {
        color: this.color,
        fontSize: `${this.size}rpx`
      }
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
.van-symbol {
  display: inline-flex;
}
</style>
