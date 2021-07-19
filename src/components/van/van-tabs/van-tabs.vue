<template>
  <view class="van-tabs" :style="[tabsStyle]" :class="{ 'border-b': border }">
    <view
      class="tab-item"
      v-for="(item, index) in list"
      :key="index"
      @tap="tabClick(index)"
      :style="[tabItemStyle(index)]"
    >
      <view class="flex-box">
        {{ item.name || item }}
        <van-icons
          color="#c0c4cc"
          v-if="showArrow"
          type="arrowtriangle"
          :class="{ 'icon-active': index === value }"
        />
      </view>
      <view
        class="tab-bar"
        :class="{ 'tab-bar--active': index === value && showBar }"
        :style="[tabBarStyle]"
      ></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'van-tabs-base',
  props: {
    //需循环的标签列表
    list: {
      type: Array,
      default() {
        return []
      }
    },
    // 是否悬浮,默认false
    isFixed: {
      type: Boolean,
      default: false
    },
    //是否显示 icon
    showArrow: {
      type: Boolean,
      default: false
    },
    //是否显示 border
    border: {
      type: Boolean,
      default: false
    },
    // 当前显示的下标 (使用v-model语法糖: 1.props需为value; 2.需回调input事件)
    value: {
      type: [String, Number],
      default: 0
    },
    // 导航栏的高度
    height: {
      type: [String, Number],
      default: 88
    },
    // 字体大小
    fontSize: {
      type: [String, Number],
      default: ''
    },
    // 过渡动画时长, 单位ms
    duration: {
      type: [String, Number],
      default: 0.3
    },
    // 选中项的主题颜色
    activeColor: {
      type: String,
      default: '#2979ff'
    },
    // 未选中项的颜色
    inactiveColor: {
      type: String,
      default: '#303133'
    },
    // 菜单底部移动的bar的宽度，单位rpx
    barWidth: {
      type: [String, Number],
      default: 40
    },
    // 移动bar的高度
    barHeight: {
      type: [String, Number],
      default: 6
    },
    // 导航栏的背景颜色
    bgColor: {
      type: String,
      default: '#ffffff'
    },
    // 活动tab字体是否加粗
    bold: {
      type: Boolean,
      default: false
    },
    // 当前活动tab item的样式
    activeItemStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 是否显示底部的滑块
    showBar: {
      type: Boolean,
      default: true
    },
    // 底部滑块的自定义样式
    barStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 标签的宽度
    tabWidth: {
      type: [Number, String],
      default: 'auto'
    },
    //距离顶部的高度
    top: {
      type: [Number, String],
      default: ''
    }
  },
  computed: {
    //父元素样式
    tabsStyle() {
      let style = {}
      style.background = this.bgColor
      style.height = this.height + 'rpx'
      if (this.top) style.top = this.top + 'rpx'
      return style
    },
    // 移动bar的样式
    tabBarStyle() {
      let style = {
        width: this.barWidth + 'rpx',
        backgroundColor: this.activeColor,
        height: this.barHeight + 'rpx',
        borderRadius: `${this.barHeight / 2}px`
      }
      Object.assign(style, this.barStyle)
      return style
    },
    // tabItem的样式
    tabItemStyle() {
      return index => {
        let style = {
          'font-size': this.fontSize + 'rpx'
        }
        // 字体加粗
        if (index == this.value && this.bold) style.fontWeight = 'bold'
        if (index == this.value) {
          style.color = this.activeColor
          // 给选中的tab item添加外部自定义的样式
          style = Object.assign(style, this.activeItemStyle)
        } else {
          style.color = this.inactiveColor
        }
        return style
      }
    }
  },
  methods: {
    // 点击某一个tab菜单
    tabClick(index) {
      // 点击当前活动tab，不触发事件
      if (this.value !== index) {
        this.$emit('input', index)
        this.$emit('change', index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-tabs {
  font-size: 30rpx;
  position: sticky;
  z-index: 99;
  top: var(--window-top);
  display: flex;
}
.tab-item {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  .tab-bar {
    position: absolute;
    z-index: 0;
    bottom: 0;
    visibility: hidden;
    width: 0;
    transition: all 0.3s;
    opacity: 0;
  }
  .tab-bar--active {
    visibility: unset;
    opacity: 1;
  }
}

.van-icons {
  transition: transform 0.3s;
}
.icon-active {
  transform: rotate(180deg);
}
</style>
