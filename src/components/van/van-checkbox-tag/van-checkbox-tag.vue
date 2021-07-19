<template>
  <view class="van-checkbox-tag" @tap="toggle" :class="[iconClass]">
    {{ name }}
    <slot />
  </view>
</template>

<script>
export default {
  name: 'van-checkbox-tag',
  props: {
    // checkbox的名称
    name: {
      type: [String, Number],
      default: ''
    },
    //圆角样式
    radius: {
      type: [Number, String],
      default: ''
    },
    // 选中状态下的颜色，如设置此值，将会覆盖checkboxGroup的activeColor值
    activeColor: {
      type: String,
      default: ''
    },
    //是否无需背景颜色（空心标签）
    inverted: {
      type: Boolean,
      default: true
    },
    //square为方形，circle为圆形
    shape: {
      type: String,
      default: 'circle'
    },
    // 是否为选中状态
    value: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: [String, Boolean],
      default: false
    },
    // 组件的整体大小
    size: {
      type: [String, Number],
      default: ''
    }
  },

  created() {
    // 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环应用
    this.parent = this.$u.$parent.call(this, 'u-checkbox-group')
    // 如果存在u-checkbox-group，将本组件的this塞进父组件的children中
    this.parent && this.parent.children.push(this)
  },

  computed: {
    // 是否禁用，如果父组件van-checkbox-group禁用的话，将会忽略子组件的配置
    isDisabled() {
      return this.disabled !== '' ? this.disabled : false
    },

    // 组件选中激活时的颜色
    elActiveColor() {
      return this.activeColor ? this.activeColor : 'primary'
    },
    // 组件的形状
    elShape() {
      return this.shape ? this.shape : 'square'
    },
    iconClass() {
      let classes = []
      classes.push('van-checkbox--' + this.elShape)
      if (this.inverted) classes.push('border')
      if (this.value == true) classes.push('van-checkbox--checked')
      if (this.isDisabled) classes.push('van-checkbox--disabled')
      if (this.value && this.isDisabled) classes.push('van-checkbox--disabled--checked')
      // 支付宝小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
      return classes.join(' ')
    }
  },
  methods: {
    toggle() {
      if (!this.isDisabled) {
        this.setValue()
      }
    },
    emitEvent() {
      this.$emit('change', {
        value: !this.value,
        name: this.name
      })
      // 执行父组件u-checkbox-group的事件方法
      // 等待下一个周期再执行，因为this.$emit('input')作用于父组件，再反馈到子组件内部，需要时间
      setTimeout(() => {
        if (this.parent && this.parent.emitEvent) this.parent.emitEvent()
      }, 80)
    },
    // 设置input的值，这里通过input事件，设置通过v-model绑定的组件的值
    setValue() {
      // 判断是否超过了可选的最大数量
      let checkedNum = 0
      if (this.parent && this.parent.children) {
        // 只要父组件的某一个子元素的value为true，就加1(已有的选中数量)
        this.parent.children.map(val => {
          if (val.value) checkedNum++
        })
      }
      // 如果原来为选中状态，那么可以取消
      if (this.value == true) {
        this.emitEvent()
        this.$emit('input', !this.value)
      } else {
        // 如果超出最多可选项，提示
        if (this.parent && checkedNum >= this.parent.max) {
          return this.$u.toast(`最多可选${this.parent.max}项`)
        }
        // 如果原来为未选中状态，需要选中的数量少于父组件中设置的max值，才可以选中
        this.emitEvent()
        this.$emit('input', !this.value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-checkbox {
  &-tag {
    /* #ifndef APP-NVUE */
    display: inline-flex;
    overflow: hidden;

    /* #endif */
    align-items: center;
    height: 48rpx;
    padding: 0 28rpx;
    user-select: none;
    transition-duration: 0.2s;
    transition-property: color, border-color, background-color;
    border-color: #e8e8e8;
    background-color: #e8e8e8;
  }

  &--circle {
    border-radius: 48rpx;
  }

  &--checked {
    color: #fff;
    border-color: $u-type-primary;
    background-color: $u-type-primary;
  }

  &--disabled {
    border-color: #c8c9cc;
    background-color: #ebedf0;
  }

  &--disabled--checked {
    color: #c8c9cc !important;
  }
}
</style>
