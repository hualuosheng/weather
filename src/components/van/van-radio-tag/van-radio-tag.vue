<template>
  <view class="van-radio--tag color-base" @tap="toggle" :class="[radioClass]" :style="[radioStyle]">
    {{ name }}
    <slot />
  </view>
</template>

<script>
export default {
  name: 'van-radio--tag',
  props: {
    //radio的名称
    name: {
      type: [String, Number],
      default: ''
    },
    //选中标识
    value: {
      type: String,
      default: ''
    },
    //圆角样式
    radius: {
      type: [Number, String],
      default: ''
    },
    //未选中颜色, 默认
    inactiveColor: {
      type: String,
      default: ''
    },
    //选中状态下的颜色
    activeColor: {
      type: String,
      default: ''
    },
    //默认字体颜色
    sizeColor: {
      type: String,
      default: ''
    },
    //是否禁用
    disabled: {
      type: [String, Boolean],
      default: ''
    }
  },
  computed: {
    // 是否禁用
    isDisabled() {
      return this.disabled !== '' ? this.disabled : false
    },

    radioStyle() {
      let style = {}
      //选中状态
      style.background = this.value === this.name ? this.activeColor : this.inactiveColor
      style.color = this.value === this.name ? '#fff' : ''
      return style
    },
    radioClass() {
      return { 'van-radio--disabled': this.isDisabled }
    }
  },

  methods: {
    toggle() {
      if (!this.isDisabled) {
        this.setValue()
      }
    },
    emitEvent() {
      this.$emit('change', this.name)
    },
    // 设置input的值，这里通过input事件，设置通过v-model绑定的组件的值
    setValue() {
      this.emitEvent()
      this.$emit('input', this.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.van-radio {
  &--tag {
    font-size: 26rpx;
    /* #ifndef APP-NVUE */
    display: inline-flex;
    /* #endif */
    overflow: hidden;
    align-items: center;
    height: 50rpx;
    padding: 0 16rpx;
    user-select: none;
    transition-duration: 0.2s;
    transition-property: color, border-color, background-color;
    border-radius: 48rpx;
  }
  &--disabled {
    opacity: 0.25;
  }
}
</style>
