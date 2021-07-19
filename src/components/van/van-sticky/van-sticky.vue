<template>
  <view class="u-sticky" :style="[stickyStyle]">
    <slot />
  </view>
</template>

<script>
export default {
  name: 'u-sticky',
  props: {
    // 吸顶容器到顶部某个距离的时候，进行吸顶，在H5平台，NavigationBar为44px
    offsetTop: {
      type: [Number, String],
      default: 0
    },
    //列表中的索引值
    index: {
      type: [Number, String],
      default: ''
    },
    // 是否开启吸顶功能
    enable: {
      type: Boolean,
      default: true
    },
    // h5顶部导航栏的高度
    h5NavHeight: {
      type: [Number, String],
      default: 44
    },
    // 吸顶区域的背景颜色
    bgColor: {
      type: String,
      default: '#ffffff'
    },
    //圆角值默认不添加单位
    bdRadius: {
      type: String,
      default: ''
    },
    // z-index值
    zIndex: {
      type: [Number, String],
      default: ''
    }
  },
  computed: {
    stickyStyle() {
      let style = {
        background: this.bgColor,
        color: this.bgColor !== '#ffffff' ? '#fff' : '',
        borderRadius: this.bdRadius,
        position: this.enable ? 'sticky' : ''
      }
      return style
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.u-sticky {
  z-index: 999;
  top: 0;
  height: 44px;
  background: #000;
  display: flex;
  align-items: center;
}
</style>
