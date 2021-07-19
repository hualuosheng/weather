<template>
  <view
    :class="[maps ? 'mapclas van-grid-item' : 'van-grid-item']"
    :hover-class="parentData.hoverClass"
    :hover-stay-time="200"
    @tap="click"
    :style="{
      background: bgColor,
      width: width
    }"
  >
    <view
      class="van-grid-item-box"
      :style="[customStyle]"
      :class="[parentData.border ? 'border-r border-b' : '']"
    >
      <slot />
    </view>
  </view>
</template>

<script>
export default {
  name: 'van-grid-item',
  props: {
    // 背景颜色
    bgColor: {
      type: String,
      default: ''
    },
    // 点击时返回的index
    index: {
      type: [Number, String],
      default: ''
    },
    //
    maps: {
      type: [Boolean],
      default: false
    },
    // 自定义样式，对象形式
    customStyle: {
      type: Object,
      default() {
        return {
          padding: '30rpx 0'
        }
      }
    }
  },
  data() {
    return {
      parentData: {
        hoverClass: '', // 按下去的时候，是否显示背景灰色
        col: 3, // 父组件划分的宫格数
        border: true // 是否显示边框，根据父组件决定
      }
    }
  },
  created() {
    // 父组件的实例
    this.updateParentData()
    // this.parent在updateParentData()中定义
    this.parent.children.push(this)
  },
  computed: {
    // 每个grid-item的宽度
    width() {
      return 100 / Number(this.parentData.col) + '%'
    }
  },
  methods: {
    // 获取父组件的参数
    updateParentData() {
      // 此方法写在mixin中
      this.getParentData('van-grid')
    },
    click() {
      this.$emit('click', this.index)
      this.parent && this.parent.click(this.index)
    }
  }
}
</script>

<style scoped lang="scss">
.mapclas {
  align-self: normal;
  text-align: center;
  height: 50px;
}
.van-grid-item {
  box-sizing: border-box;
  @include vue-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;

  /* #ifdef MP */
  position: relative;
  float: left;
  /* #endif */
}

.van-grid-item-hover {
  background: #f7f7f7 !important;
}

.u-grid-marker-box {
  position: absolute;
  /* #ifndef APP-NVUE */
  display: inline-flex;
  /* #endif */
  line-height: 0;
}

.u-grid-marker-wrap {
  position: absolute;
}

.van-grid-item-box {
  padding: 30rpx 0;
  @include vue-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%;
}
</style>
