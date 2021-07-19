<template>
  <view
    class="van-tab-slide"
    :class="{ 'van-tabs--fixed': isFixed, 'border-b': border }"
    :style="tabsStyle"
  >
    <scroll-view
      v-if="list.length"
      :id="viewId"
      :scroll-left="scrollLeft"
      scroll-x
      scroll-with-animation
      :scroll-animation-duration="300"
    >
      <view
        class="tabs-item"
        :class="{ 'tabs-flex': !isScroll, 'tabs-scroll': isScroll }"
      >
        <!-- tab -->
        <view
          class="tab-item"
          v-for="(item, index) in list"
          :class="{ active: value === index }"
          :key="index"
          @tap="tabClick(index)"
          :style="[tabItemStyle(index)]"
        >
          {{ item.name || item }}
        </view>
        <!-- 下划线 -->
        <view class="tabs-line" :style="[tabBarStyle]"></view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  props: {
    // 支持格式: ['全部', '待付款'] 或 [{name:'全部'}, {name:'待付款'}]
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    //是否悬浮,默认false
    isFixed: {
      type: Boolean,
      default: false
    },
    // 当前显示的下标 (使用v-model语法糖: 1.props需为value; 2.需回调input事件)
    value: {
      type: [String, Number],
      default: 0
    },
    // 每个tab的宽度,默认不设置值,为flex平均分配; 如果指定宽度,则不使用flex,每个tab居左,超过则水平滑动(单位默认rpx)
    tabWidth: {
      type: [Number, String],
      default: ''
    },
    // 导航栏的背景颜色
    bgColor: {
      type: String,
      default: '#ffffff'
    },
    // 导航栏的高度和行高
    height: {
      type: [String, Number],
      default: 80
    },
    // 字体大小
    fontSize: {
      type: [String, Number],
      default: ''
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
    // 当前活动tab item的样式
    activeItemStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 活动tab字体是否加粗
    bold: {
      type: Boolean,
      default: false
    },
    //是否显示边框
    border: {
      type: Boolean,
      default: false
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
    //顶部距离
    top: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      viewId:
        'id_' +
        Math.random()
          .toString(36)
          .substr(2, 16),
      scrollLeft: 0
    }
  },
  computed: {
    tabsStyle() {
      return `background:${this.bgColor};height:${this.height}rpx;top:${this.top}px`
    },
    isScroll() {
      return this.tabWidth && this.list.length // 指定了tabWidth的宽度,则支持水平滑动
    },
    tabWidthVal() {
      return this.isScroll ? uni.upx2px(this.tabWidth) : ''
    },
    // tab的样式
    tabItemStyle() {
      return index => {
        let height = this.height
        let style = {
          height: height + 'rpx',
          'line-height': height + 'rpx',
          'font-size': this.fontSize + 'rpx',
          width: this.isScroll ? this.tabWidth + 'rpx' : ''
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
    },
    // 移动bar的样式
    tabBarStyle() {
      let style = {
        width: this.barWidth + 'rpx',
        'background-color': this.activeColor,
        height: this.barHeight + 'rpx',
        // 设置一个很大的值，它会自动取能用的最大值，不用高度的一半，是因为高度可能是单数，会有小数出现
        'border-radius': `${this.barHeight / 2}px`,
        left: ''
      }
      if (this.isScroll) {
        // 需转为px (用rpx的话iOS真机显示有误差)
        style.left = this.tabWidthVal * this.value + this.tabWidthVal / 2 + 'px'
      } else {
        style.left =
          (100 / this.list.length) * (this.value + 1) -
          100 / (this.list.length * 2) +
          '%'
      }

      Object.assign(style, this.barStyle)
      return style
    }
  },
  watch: {
    list() {
      this.warpWidth = null // 重新计算容器宽度
      this.scrollCenter() // 水平滚动到中间
    },
    value() {
      this.scrollCenter() // 水平滚动到中间
    }
  },
  methods: {
    tabClick(index) {
      if (this.value != index) {
        this.$emit('input', index)
        this.$emit('change', index)
      }
    },
    async scrollCenter() {
      if (!this.isScroll) return
      if (!this.warpWidth) {
        // tabs容器的宽度
        let rect = await this.initWarpRect()
        this.warpWidth = rect ? rect.width : uni.getSystemInfoSync().windowWidth // 某些情况下取不到宽度,暂时取屏幕宽度
      }
      let tabLeft = this.tabWidthVal * this.value + this.tabWidthVal / 2 // 当前tab中心点到左边的距离
      let diff = tabLeft - this.warpWidth / 2 // 如果超过tabs容器的一半,则滚动差值
      this.scrollLeft = diff
      // #ifdef MP-TOUTIAO
      this.scrollTimer && clearTimeout(this.scrollTimer)
      this.scrollTimer = setTimeout(() => {
        // 字节跳动小程序,需延时再次设置scrollLeft,否则tab切换跨度较大时不生效
        this.scrollLeft = Math.ceil(diff)
      }, 400)
      // #endif
    },
    initWarpRect() {
      return new Promise(resolve => {
        setTimeout(() => {
          // 延时确保dom已渲染, 不使用$nextclick
          let query = uni.createSelectorQuery()
          // #ifndef MP-ALIPAY
          query = query.in(this) // 支付宝小程序不支持in(this),而字节跳动小程序必须写in(this), 否则都取不到值
          // #endif
          query
            .select('#' + this.viewId)
            .boundingClientRect(data => {
              resolve(data)
            })
            .exec()
        }, 20)
      })
    }
  },
  mounted() {
    this.scrollCenter() // 滚动到当前下标
  }
}
</script>

<style lang="scss">
.van-tabs--fixed {
  position: fixed;
  z-index: 990;
  top: var(--window-top);
  left: 0;
  width: 100%;
}
.van-tab-slide {
  font-size: 30rpx;
  overflow-y: hidden;
  .tabs-item {
    position: relative;
    padding-bottom: 30rpx; // 撑开高度,再配合van-tab-slide的overflow-y: hidden,以达到隐藏滚动条的目的
    white-space: nowrap;
    .tab-item {
      position: relative;
      text-align: center;
    }
  }

  // 平分的方式显示item
  .tabs-flex {
    display: flex;
    .tab-item {
      flex: 1;
    }
  }
  // 居左显示item,支持水平滑动
  .tabs-scroll {
    .tab-item {
      display: inline-block;
    }
  }

  // 选中tab的线
  .tabs-line {
    position: absolute;
    z-index: 1;
    bottom: 30rpx; // 至少与.tabs-item的padding-bottom一致,才能保证在底部边缘  width: 50rpx;  height: 6rpx;
    transition: left 0.3s;
    transform: translateX(-50%);
    border-radius: 4rpx;
  }
}
</style>
