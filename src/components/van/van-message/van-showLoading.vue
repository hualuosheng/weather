<template>
  <van-mask
    :show="init.show"
    @click="close"
    :zoom="init.zoom"
    :maskOpacity="init.maskOpacity"
    :maskClickAble="init.maskClickAble"
  >
    <view class="loading" @tap.stop.prevent @touchmove.stop.prevent>
      <view class="flex-box" :class="loadingClassName" v-if="init.loadingType">
        <block v-if="init.loadingType !== 'ring' && init.loadingType !== 'line'">
          <view
            class="item"
            v-for="index in init.loadingNumber"
            :key="index"
            :style="{
              transform: `rotate(${(360 / init.loadingNumber) * index}deg)`,
              animationDelay: `${(1 / init.loadingNumber) * index}s`
            }"
          />
        </block>

        <block v-if="init.loadingType === 'line'">
          <view
            class="item"
            v-for="index in init.loadingNumber / 2"
            :key="index"
            :style="{ animationDelay: `${(0.5 / (init.loadingNumber / 2)) * index}s` }"
          />
        </block>
      </view>

      <van-icons v-else-if="init.iconType" :type="init.iconType" size="100" color="#fff " />

      <slot name="title">
        <view class="title" v-show="init.title">{{ init.title }}</view>
      </slot>
    </view>
  </van-mask>
</template>

<script>
// import vanMask from '@/components/van-mask/van-mask'
export default {
  data() {
    return {
      init: this.$modalStore.state
    }
  },
  // components: {
  //   vanMask
  // },
  computed: {
    loadingBallStyle() {},
    loadingClassName() {
      // if (this.init.loadingType !== 'ring') {
      return `loading-${this.init.loadingType}`
      // }
    }
  },
  methods: {
    close() {
      this.$modalStore.commit('hide')
    }
  },
  beforeDestroy() {
    this.$modalStore.commit('hide')
  }
}
</script>

<style lang="scss" scoped>
@import './loading.scss';

.loading {
  width: auto;
  min-width: 128px;
  max-width: 270px;
  padding: 30rpx;
  text-align: center;
  color: #fff;
  border-radius: 20rpx;
  background-color: rgba(0, 0, 0, 0.6);
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3);
}

.yticon {
  display: block;
  margin: 5px auto 10px;
}

.title {
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
}

[class*='loading-'],
[class^='loading-'] {
  position: relative;
  width: 40px;
  height: 40px;
  margin: 5px auto 10px;
}

.item {
  margin: 2px;
  transform-origin: 50% 40rpx;
  background-color: #fff;
}

/* 圆环 */
.loading-ring {
  animation: loading-circle 0.5s infinite linear;
  border: solid 2px;
  border-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.3) rgb(255, 255, 255);
  border-radius: 50%;
}

.loading-ball,
.loading-flower {
  .item {
    position: absolute;
    top: 0;
  }
}

/* 小球 */
.loading-ball {
  position: relative;
  width: 100%;
  height: 88rpx;
  margin: 5px auto 10px;
  .item {
    width: 8rpx;
    height: 8rpx;
    animation: loading-ball 1s 0s infinite linear;
    border-radius: 100%;
  }
}

/* 花朵 */
.loading-flower {
  .item {
    width: 3px;
    height: 14px;
    animation: loading-flower 1s 0s infinite linear;
    border-radius: 1.5px;
  }
}

/* 音乐 */
.loading-line {
  width: 100%;
  height: 100%;
  .item {
    width: 3px;
    height: 30px;
    margin: 2px 4px;
    transform: scaleY(0) translateX(-10px);
    animation: loading-line 1s 0s infinite ease-in-out;
    // animation: loading-line 1s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    border-radius: 1.5rpx;
  }
}
</style>
