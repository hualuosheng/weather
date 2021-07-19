<template>
  <view
    class="van-cell"
    :hover-class="cellHoverStyle"
    :hover-stay-time="50"
    :class="{ 'border-b': border }"
    :style="[vanSectionStyle]"
    @click="_onClick"
  >
    <view class="van-cell-left__box">
      <view class="van-cell--title" :class="[cellTitleClass]" :style="[cellTitleStyle]">
        {{ title }}
      </view>
      <view class="ml16 color-middle van-cell-left__text" v-if="leftText" :style="[leftTextStyle]">
        {{ leftText }}
      </view>
    </view>

    <view
      v-if="rightText || showArrow || iconType || $slots.right"
      class="van-cell-right__box"
      :class="{ 'row-reverse': rowReverse }"
      :style="[rightBoxStyle]"
    >
      <slot name="right" />
      <view v-if="rightText" class="van-cell-right__text" :class="line"> {{ rightText }}</view>
      <van-icons
        class="van-cell-right__icon"
        v-if="showArrow || iconType !== 'arrow-right'"
        :type="iconType"
        :size="iconSize"
        :color="iconCorlor"
      />
    </view>
  </view>
</template>

<script>
export default {
  name: 'van-cell',
  props: {
    title: {
      type: String,
      default: ''
    },
    bdRadius: {
      type: String,
      default: ''
    },
    //标题颜色
    titleColor: {
      type: String,
      default: ''
    },
    //标题大小
    titleSize: {
      type: [String, Number],
      default: ''
    },
    //标题行数
    titleLine: {
      type: [String, Boolean],
      default: ''
    },
    //标题是否加粗
    bold: {
      type: Boolean,
      default: false
    },
    //左侧提示文字
    leftText: {
      type: [Number, String],
      default: ''
    },
    //左侧文字大小
    leftSize: {
      type: [Number, String],
      default: ''
    },
    //左侧文字颜色
    leftColor: {
      type: String,
      default: '#909399'
    },
    //右侧文字
    rightText: {
      type: String,
      default: ''
    },
    //右侧颜色
    rightColor: {
      type: String,
      default: '#909399'
    },
    //右侧图标文字是否反转
    rowReverse: {
      type: Boolean,
      default: false
    },
    //文字行数 rightText
    line: {
      type: [Boolean, String],
      default: ''
    },
    //是否显示右侧箭头
    showArrow: {
      type: [Boolean, String],
      default: false
    },
    //是否添加下边框
    border: {
      type: Boolean,
      default: true
    },
    //背景色
    bgColor: {
      type: String,
      default: '#fff'
    },
    //图标类型
    iconType: {
      type: String,
      default: 'arrow-right'
    },
    //图标大小
    iconSize: {
      type: [String, Number],
      default: '32'
    },
    iconCorlor: {
      type: String,
      default: '#909399'
    },
    //是否开启点击反馈
    clickable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    vanSectionStyle() {
      let style = {}
      style.background = this.bgColor
      style.borderRadius = this.bdRadius
      return style
    },
    //大标题样式
    cellTitleStyle() {
      let style = {}
      style.color = this.titleColor
      style.fontSize = this.titleSize + 'rpx'
      return style
    },
    cellTitleClass() {
      let classes = []
      classes.push(this.bold ? 'fw600 fs32' : 'fs30')
      classes.push(this.titleLine ? 'line2' : '')
      return classes.join(' ')
    },

    //左侧文字样式
    leftTextStyle() {
      let style = {}
      if (this.leftColor) style.color = this.leftColor
      if (this.leftSize) style.fontSize = this.leftSize + 'rpx'
      return style
    },

    //添加点击反馈效果
    cellHoverStyle() {
      if (this.clickable) return 'van-cell--hover'
    },

    //右侧box
    rightBoxStyle() {
      let style = {}
      if (this.rightColor) style.color = this.rightColor
      // if (this.rightCenter) style.alignItems = 'center'
      return style
    }
  },
  methods: {
    _onClick() {
      return this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.van-cell {
  display: flex;
  overflow: hidden;
  align-items: center;
  padding: 28rpx;
  .van-cell-left__box {
    display: flex;
    align-items: flex-end;
  }

  .van-cell-right__box {
    font-size: 28rpx;
    display: flex;
    align-items: center;
    align-self: stretch;
    flex-grow: 1;
    justify-content: flex-end;
    width: 0;
    &.row-reverse {
      flex-flow: row-reverse !important;
      justify-content: flex-start;
      .van-cell-right__text {
        padding-left: 8rpx;
      }
    }
  }
  .van-cell-right__text.line1 {
    padding-left: 50rpx;
  }
}
.van-cell-right__icon {
  min-width: 40rpx;
  min-height: 32rpx;
  padding-left: 8rpx;
}
.van-cell--hover {
  background-color: $u-bg-color !important;
}
</style>
