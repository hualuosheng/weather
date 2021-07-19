<template>
  <view
    class="van-tag"
    :class="[tagClass, typeClass]"
    :style="[tagStyle]"
    @click="_onClick"
  >
    {{ text }}
  </view>
</template>

<script>
export default {
  name: 'van-tag',
  props: {
    //tag背景色
    bgColor: {
      type: String,
      default: ''
    },
    //标签大小 normal, mini
    size: {
      type: String,
      default: ''
    },
    //是否显士清除icon
    closeable: {
      type: Boolean,
      default: false
    },
    // default灰 || primar蓝
    type: {
      type: String,
      default: ''
    },
    //字体 边框颜色
    color: {
      type: String,
      default: ''
    },
    // 标签内容
    text: {
      type: String,
      default: ''
    },
    // 是否为禁用状态
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否为空心
    inverted: {
      type: Boolean,
      default: false
    },
    // 是否为圆角样式
    circle: {
      type: Boolean,
      default: true
    },
    // 是否为标记样式
    mark: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    //计算标签class
    tagClass() {
      return [
        this.inverted ? 'border' : '',
        this.size && this.size === 'mini' ? 'van-tag--mini' : '',
        this.circle ? 'van-tag--circle' : '',
        this.disabled ? 'van-tag--disabled' : ''
      ]
    },
    //class类型
    typeClass() {
      return this.type && !this.inverted
        ? `van-tag--${this.type}`
        : `van-tag--${this.type}__inverted`
    },
    // 行内样式
    tagStyle() {
      let style = {
        background: this.bgColor,
        color: this.bgColor ? '#fff' : ''
      }
      if (this.bgColor && !this.inverted) return style
    }
  },
  methods: {
    _onClick() {
      if (this.disabled === true || this.disabled === 'true') {
        return
      }
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
$tag-pd: 0 14px;
$tag-mini-pd: 0 8px;

.van-tag {
  /* #ifndef APP-NVUE */
  display: inline-flex;
  /* #endif */
  align-items: center;
  align-self: baseline;
  justify-content: center;
  border-radius: 2px;
  padding: 4px 14px;
  &--mini {
    font-size: 22rpx;
    padding: 10rpx 16rpx;
  }

  /* 默认 */
  &--default {
    height: 60rpx;
    color: inherit;
    color: $u-tips-color;
    background-color: $u-bg-color;
  }

  /* 确认 */
  &--primary {
    color: #fff;
    background-color: $u-type-primary;
  }
  &--primary__inverted {
    color: $u-type-primary;
  }
}

.van-icon-closeable {
  padding-left: 8rpx;
}

.van-tag::after {
  border-color: inherit;
}
.van-tag--circle {
  border-radius: 52rpx;
}
.van-tag--disabled {
  opacity: 0.5;
}
.van-tag--error__inverted {
  background-color: #fff;
  color: #fa3534;
}
</style>
