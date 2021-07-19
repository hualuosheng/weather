<template>
  <view
    :style="[iconStyle]"
    class="van-icons"
    :class="[`van-icon-${type}`]"
    @click="_onClick"
  >
    {{ icons[type] }}
  </view>
</template>
<script>
import icons from './icons.js'
export default {
  name: 'van-icons',
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: [Number, String],
      default: '32'
    }
  },
  computed: {
    iconStyle() {
      let style = {
        color: this.color,
        fontSize: `${this.size}rpx`
      }
      return style
    },
    iconClass() {}
  },
  data() {
    return {
      icons: icons
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
.van-icons {
  display: inline-flex;
  text-align: center;
}
</style>
