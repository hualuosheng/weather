<template>
  <view
    class="flex-box van-mask"
    hover-stop-propagation
    @tap="click"
    @touchmove.stop.prevent="() => {}"
    :style="[maskStyle, zoomStyle]"
    :class="{ 'van-mask--show': show }"
    ref="mask"
  >
    <slot />
  </view>
</template>

<script>
export default {
  name: 'van-mask',
  props: {
    // 是否显示遮罩
    show: {
      type: Boolean,
      default: false
    },
    //mask 背景
    maskOpacity: {
      type: Number,
      default: 0.3
    },
    // 用户自定义样式
    customStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    zIndex: {
      type: Number,
      default: 9999
    },
    // 遮罩的动画样式， 是否使用使用zoom进行scale进行缩放
    zoom: {
      type: Boolean,
      default: true
    },
    // 遮罩的过渡时间，单位为ms
    duration: {
      type: [Number, String],
      default: 300
    },
    // 是否可以通过点击遮罩进行关闭
    maskClickAble: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      zoomStyle: {
        transform: ''
      },
      scale: ''
    }
  },
  watch: {
    show(n, o) {
      if (!this.zoom) return
      // 初次挂载开启延时器 延迟改变watch
      let initial = true
      let time

      // 展示遮罩，设置scale为1，达到缩小(原来为1.2)的效果
      if (n) {
        if (initial) {
          initial = false
          clearTimeout(time)
          time = setTimeout(() => {
            this.zoomStyle.transform = 'scale(1)'
          }, 0)
        } else {
          this.zoomStyle.transform = 'scale(1)'
        }
      }

      // 隐藏遮罩，设置scale为1.2，达到放大(因为显示遮罩时已重置为1)的效果
      if (!n) this.zoomStyle.transform = 'scale(1.1)'
    }
  },
  computed: {
    maskStyle() {
      let style = {}
      style.transition = `all ${this.duration / 1000}s ease-in-out`
      style.background = `rgba(0,0,0,${this.maskOpacity})`
      style.zIndex = !this.show ? -1 : this.zIndex
      // 判断用户传递的对象是否为空，不为空就进行合并
      if (Object.keys(this.customStyle).length)
        style = {
          ...style,
          ...this.customStyle
        }
      return style
    }
  },
  methods: {
    click() {
      if (!this.maskClickAble) return
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.van-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100vw;
  height: 100vh;
  transform: scale(1.1);
}

.van-mask--show {
  opacity: 1;
}
</style>
