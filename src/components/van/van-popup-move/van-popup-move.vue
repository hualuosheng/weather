<template>
  <view class="van-popup-move" :class="{ none: isShow }">
    <slot />
  </view>
</template>

<script>
export default {
  name: 'van-popup-move',
  props: {
    //显示状态
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.open()
      } else if (!this.closeFromInner) {
        this.close()
      }
      this.closeFromInner = false
    }
  },
  data() {
    return {
      isShow: false,
      timer: null,
      closeFromInner: false // value的值改变，是发生在内部还是外部
    }
  },
  mounted() {
    // 组件渲染完成时，检查value是否为true，如果是，弹出popup
    this.value && this.open()
  },
  methods: {
    open() {
      this.change(true)
    },
    close() {
      this.closeFromInner = true
      this.change(false)
    },
    change(status) {
      if (status) {
        // #ifdef H5 || MP
        this.timer = setTimeout(() => {
          this.isShow = status
          this.$emit(status ? 'open' : 'close')
        }, 0)
        // #endif
        // #ifndef H5 || MP
        this.$nextTick(() => {
          this.isShow = status
          this.$emit(status ? 'open' : 'close')
        })
        // #endif
      } else {
        this.timer = setTimeout(() => {
          this.isShow = status
          this.$emit(status ? 'open' : 'close')
        }, 0)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.van-popup-move {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: all 300ms;
  transform: translateY(204rpx);
  background-color: #fff;
  &.none {
    transform: translateY(0);
  }
}
</style>
