<template>
  <view
    class="flex-box flex-1 van-search"
    :class="[alignClass, borderClass]"
    :style="[searchStyle]"
    @click="_onClick"
  >
    <van-icons
      v-if="searchIcon"
      type="search"
      :size="iconSize"
      :color="iconStyle"
    />
    <input
      class="van-search--input"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <view class="van-search-action" v-if="showAction" :style="[actionStyle]"
      >搜索</view
    >
  </view>
</template>

<script>
export default {
  name: 'van-search',
  props: {
    //搜索框高度
    height: {
      type: [Number, String],
      default: 60
    },
    //所有颜色 icon || placeholder
    sizeColor: {
      type: String,
      default: ''
    },
    //是否禁用输入
    disabled: {
      type: Boolean,
      default: true
    },
    //子元素对齐方式 || css样式默认居中
    align: {
      type: String,
      default: 'left'
    },
    placeholder: {
      type: String,
      default: ''
    },
    //是否显示 searchIcon || 自定义
    searchIcon: {
      type: [Boolean, String],
      default: true
    },
    //搜索图标大小
    iconSize: {
      type: String,
      default: '28'
    },
    //搜索图标颜色
    iconColor: {
      type: String,
      default: ''
    },
    //搜索框边框颜色
    bdColor: {
      type: String,
      default: ''
    },
    //搜索框背景色
    bgColor: {
      type: String,
      default: ''
    },
    //是否显示右侧控件
    showAction: {
      type: Boolean,
      default: false
    },
    actionBgColor: {
      type: String,
      default: '#2979ff'
    }
  },
  computed: {
    //计算子元素对齐方式
    alignClass() {
      switch (this.align) {
        case 'left':
          return 'flex-left'
        case 'right':
          return 'flex-right'
      }
    },
    //边框样式
    borderClass() {
      return this.bdColor ? 'border' : ''
    },
    //计算图标样式 || 默认继承 sizeColor
    iconStyle() {
      return this.iconColor ? this.iconColor : this.sizeColor
    },
    //计算搜索框样式
    searchStyle() {
      let style = {}
      style.color = this.color
      style.height = this.height + 'rpx'
      style.color = this.sizeColor
      style.borderRadius = this.height + 'rpx'
      style.background = this.bgColor
      return style
    },
    actionStyle() {
      let style = {}
      if (this.actionBgColor) style.color = '#fff'
      style.background = this.actionBgColor
      if (this.actionBgColor) return style
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
.border:after {
  border-color: inherit;
}
.van-search {
  padding-left: 20rpx;
  background-color: #fff;
  overflow: hidden;
  .van-search--input {
    font-size: 28rpx;
    line-height: 1;
    height: 100%;
    padding-left: 20rpx;
  }
  :v-deep .uni-input-input {
    color: $u-main-color;
  }
  /* 左对齐,input获取剩余空间 */
  &.flex-left .van-search--input {
    flex: 1;
  }

  .input-placeholder {
    color: inherit;
  }

  .van-search-action {
    height: 100%;
    display: flex;
    padding: 0 20rpx;
    align-items: center;
  }
}
</style>
