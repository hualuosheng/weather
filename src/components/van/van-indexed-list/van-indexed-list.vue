<template>
  <!-- 可以嵌套 scroll-view 实现局部滚动 -->
  <scroll-view
    :scroll-into-view="scrollViewId"
    scroll-y
    :style="{ height: scrollHeight + 'px' }"
  >
    <view
      class="flex flex-column"
      v-for="(item, index) in options"
      :key="index"
      :ref="'van-indexed-list-' + index"
      :id="'van-indexed-list-' + index"
    >
      <view class="van-indexed--key">
        {{ item.letter }}
      </view>
      <van-cell
        v-for="child in item.data"
        :key="child.departmentName"
        :title="child.departmentName"
        shape="square"
        mode="aspectFill"
        img-size="80"
        @click="_onClick(child.longId)"
        src="http://upload.sxyygh.com:8015/ImageServer/data/temp/doctor/2016-11-14/r-9282c846-41c8-4d76-ad57-a4f6d7b3a0fa.jpg"
      />
    </view>

    <!--  -->
    <view
      id="menu"
      class="menu"
      @touchstart="touchStart"
      @touchmove.stop.prevent="touchMove"
      @touchend="touchEnd"
      :style="[menuStyle]"
    >
      <view
        class="van-indexed--menu__item"
        v-for="(item, index) in options"
        :key="item.letter"
        :class="{ 'menu-item--active': touchmoveIndex === index }"
      >
        {{ item.letter }}
      </view>
    </view>
    <view v-if="touchmove" class="van-indexed-list__alert">
      {{ options[touchmoveIndex].letter }}
    </view>
  </scroll-view>
</template>
<script>
import throttle from '@/utils/function/throttle'
// #ifdef APP-NVUE
const dom = weex.requireModule('dom')
// #endif

// #ifdef APP-PLUS
function touchMove(e) {
  let clientY = e.touches[0].clientY
  let index = Math.floor((clientY - this.winOffsetY) / this.itemHeight)
  if (this.touchmoveIndex === index) {
    return false
  }

  if (!this.verifyTouchIndex(index)) return
  // 如果lists中不存在 menu索引的对应数据，停止滚动
  let listsLength = this.lists.length - 1
  if (index > listsLength) return

  // #ifndef APP-NVUE
  this.scrollViewId = 'van-indexed-list-' + index
  this.touchmoveIndex = index

  uni.pageScrollTo({
    scrollTop: this.lists[index].top,
    duration: 200
  })

  // #endif
  // #ifdef APP-NVUE
  dom.scrollToElement(this.$refs['van-indexed-list-' + index][0], {
    animated: false
  })
  this.touchmoveIndex = index
  // #endif
}

const throttleTouchMove = throttle(touchMove, 40)
// #endif

export default {
  name: 'vanIndexedList',
  props: {
    //value
    value: {
      type: String,
      default: ''
    },
    //渲染列表
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    //局部滚动
    localScroll: {
      type: Boolean,
      default: false
    },
    //右侧导航菜单高度
    menuHeight: {
      type: [Number, String],
      default: ''
    },
    //右侧导航菜单距离顶部高度
    menuOffsetRight: {
      type: [Number, String],
      default: ''
    },
    menuColor: {
      type: String,
      default: ''
    },
    //显示选中图标 || 未添加
    showSelect: {
      type: Boolean,
      default: false
    },
    //定义scrollHeight  局部滚动 未添加
    scrollHeight: {
      type: [Number, String],
      default: ''
    }
  },
  computed: {
    menuStyle() {
      let style = {}
      style.color = this.menuColor
      style.top = this.localScroll ? 'unset' : 0
      style.height = this.menuHeight + 'px'
      return style
    }
  },
  data() {
    return {
      lists: [],
      winHeight: 0,
      itemHeight: 0,
      winOffsetY: 0,
      touchmove: false,
      touchmoveIndex: -1,
      scrollViewId: 'van-indexed-list-0',
      touchmoveTimeout: '',
      loaded: false,
      activeIndex: -1
    }
  },
  watch: {
    options: {
      handler: function() {
        this.setList()
        this.getRectMenuInfo()
      },
      deep: true
    }
  },
  mounted() {
    //计算list items 组件高度 || 考虑性能可改用固定值
    this.lists.forEach(item => {
      this.$nextTick(() => {
        // this.$u.getRect('#van-indexed-list-' + item.index).then(res => {
        //   //这里减去的50是页面自定义tab栏的高度
        //   item.top = res.top
        // })
        const query = uni.createSelectorQuery().in(this)
        query
          .select('#van-indexed-list-' + item.index)
          .boundingClientRect(data => {
            item.top = data.top
          })
          .exec()
      })
    })
  },
  methods: {
    //过滤options列表
    setList() {
      this.options.map((item, index) => {
        let obj = {
          top: 0 //默认为0  ||  mounted 阶段计算高度
        }
        //判断options 子数组data是否为真
        if (!item.data || item.data.length === 0) return
        //组装子数组
        obj['child'] = item.data.map(value => {
          let obj = {}
          obj['key'] = item.letter
          obj['name'] = value
          obj['idx'] = index
          // obj.checked = item.checked ? item.checked : false
          return obj
        })
        obj['key'] = item.letter
        obj['index'] = index
        this.lists.push(obj)
      })
    },
    //获取menu节点信息 计算itemHeight
    getRectMenuInfo() {
      // #ifndef APP-NVUE
      const query = uni.createSelectorQuery().in(this)
      query
        .select('#menu')
        .boundingClientRect(res => {
          this.winOffsetY = res.top
          this.winHeight = res.height
          this.itemHeight = res.height / this.options.length
        })
        .exec()
      // #endif
      // #ifdef APP-NVUE
      dom.getComponentRect(this.$refs['#menu'], res => {
        this.winOffsetY = res.size.top
        this.winHeight = res.size.height
        this.itemHeight = this.winHeight / this.options.length
      })
      // #endif
    },

    //计算索引
    computeEventIndex(e) {
      //滑动开启 计算menu菜单的索引
      let clientY = e.touches[0].clientY
      let index = Math.floor(
        (Math.round(clientY) - this.winOffsetY) / this.itemHeight
      )
      return index
    },

    //限制滑动索引范围
    verifyTouchIndex(index) {
      let optionsLength = this.options.length - 1
      return index <= optionsLength && index >= 0 ? true : false
    },

    //滚动方法
    pageScrollTo(index, duration = 300) {
      // 如果lists中不存在 menu索引的对应数据，停止滚动
      let listsLength = this.lists.length - 1
      if (index > listsLength) return
      uni.pageScrollTo({
        scrollTop: this.lists[index].top,
        duration: duration
      })
    },

    //开始
    touchStart(e) {
      this.touchmove = true
      let index = this.computeEventIndex(e)
      //超出return
      if (!this.verifyTouchIndex(index)) return
      this.touchmoveIndex = index

      // #ifdef APP-NVUE
      dom.scrollToElement(this.$refs['van-indexed-list-' + index][0], {
        animated: false
      })
      // #endif

      //页面滚动  整页滚动 || 局部滚动
      if (this.localScroll) {
        this.onModel(index)
      } else {
        this.pageScrollTo(index)
      }
    },

    //移动
    touchMove(e) {
      // #ifndef APP-PLUS
      let index = this.computeEventIndex(e)
      if (this.touchmoveIndex === index) return false
      //超出return
      if (!this.verifyTouchIndex(index)) return
      this.touchmoveIndex = index

      // #endif
      // #ifdef APP-PLUS
      throttleTouchMove.call(this, e)
      // #endif

      //页面滚动  整页滚动 || 局部滚动
      if (this.localScroll) {
        this.onModel(index)
      } else {
        //去除动画
        this.pageScrollTo(index, 0)
      }
    },

    //结束
    touchEnd() {
      this.touchmove = false
      this.touchmoveIndex = -1
    },

    //局部索引表
    onModel(index) {
      // scrollViewId
      this.scrollViewId = 'van-indexed-list-' + index
      // this.$emit('input', 'van-indexed-list-' + index)
      // this.$emit('chang', 'van-indexed-list-' + index)
    },

    _onClick(item) {
      uni.navigateTo({
        url: `/sub-packages/home/chooseDoctor?departmentId=${item}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.van-indexed--key {
  font-size: 20rpx;
  padding: 20rpx 32rpx;
}

.menu {
  position: fixed;
  z-index: 999;
  top: 0;
  right: 20rpx;
  bottom: 0;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  width: 24px;
  height: 80%;
  margin: auto 0;
  color: #aaa;
}

.van-indexed--menu__item {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex: 1;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  text-align: center;
}

.menu-item--active {
  color: #007aff;
}

.van-indexed-list__alert {
  font-size: 60rpx;
  position: fixed;
  z-index: 88;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 160rpx;
  height: 160rpx;
  margin: auto;
  text-align: center;
  color: #fff;
  border-radius: 160rpx;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
