<template>
  <swiper
    circular="true"
    duration="300"
    :autoplay="true"
    :indicator-dots="dotsThis"
    indicator-color="#ddd"
    indicator-active-color="#2b85e4"
    class="van-swiper"
    @change="swiperChange"
    :style="[swiperStyle]"
  >
    <swiper-item v-for="(item, index) in list" :key="index">
      <image
        :src="item.src"
        :mode="mode"
        class="van-swiper--img"
        :style="[`border-radius:${radius}rpx`]"
      />
    </swiper-item>
  </swiper>
</template>

<script>
export default {
  name: 'van-swiper',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    bgColor: {
      type: String,
      default: '#fff'
    },
    width: {
      type: [Number, String],
      default: ''
    },
    height: {
      type: [Number, String],
      default: '228'
    },
    dotsType: {
      type: [String, Boolean],
      default: ''
    },
    mode: {
      type: String,
      default: 'aspectFill'
    },
    radius: {
      type: [Number, String],
      default: ''
    }
  },
  computed: {
    swiperStyle() {
      let style = {}
      style.background = this.bgColor === 'none' ? 'transparent' : this.bgColor
      style.height = `${this.height}rpx`
      style.width = `${this.width}rpx`
      if (this.radius) style.borderRadius = `${this.radius}rpx`
      return style
    }
  },
  data() {
    return {
      swiperCurrent: 0,
      dotsThis: !this.dotsType ? false : true
    }
  },
  methods: {
    //轮播图切换index
    swiperChange(e) {
      this.swiperCurrent = e.detail.current
    }
  }
}
</script>

<style lang="scss">
.van-swiper {
  position: relative;
  overflow: hidden;
  margin: 0 auto;
}

::v-deep uni-swiper {
  overflow: hidden;
  .van-swiper--img {
    div {
      border-radius: inherit;
    }
  }
}

/* 自定义圆点 */
.van-swiper {
  .num {
    font-size: 10px;
    line-height: 20px;
    position: absolute;
    z-index: 20;
    right: 0;
    bottom: 15px;
    display: flex;
    align-items: center;
    height: 20px;
    padding: 0 10px;
    color: #fff;
    border-radius: 10px 0 0 10px;
    background: rgba(0, 0, 0, 0.2);
  }
}

// 自定义
.custom-class {
  position: relative;
  width: 100%;
  height: 732rpx;
}
</style>
