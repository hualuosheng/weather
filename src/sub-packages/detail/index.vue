<template>
  <view class="container">
    <view class="swiper-view">
      <swiper class="swiper" @change="swiperChange">
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <image :src="item.url" alt="" />
        </swiper-item>
      </swiper>
      <swiperDots
        :swiper-length="swiperList.length"
        :swiper-current="swiperCurrent"
      />
    </view>
    <view class="plate first">
      <view class="common-title">
        海棠公园
      </view>
      <view class="info">
        <view class="info-item">
          <image src="@/static/Time_light@2x.png"></image>
          <view>
            <text>00:00~24:00</text>
            <text>节假日不休</text>
          </view>
        </view>
        <view class="info-item">
          <image src="@/static/Pin_light@2x.png"></image>
          <text
            >北京朝阳区高碑店东区 12390 号北京朝阳区高碑店东区 12390 号</text
          >
        </view>
        <view class="info-item">
          <image class="icon-gy" src="@/static/gongyuan@2x.png"></image>
          <text class="text-box" :class="{ active: isShow }"
            >地坛又称方泽坛，是古都北京五坛中的第二大坛。始建于明代嘉靖九年（公元1530年），坐落于安定门外东侧，与天坛遥相对应，与雍和宫、孔庙、国子监隔河相望。地坛是一座庄严肃穆、古朴幽雅的皇家坛庙，是明清两朝帝王祭祀“皇地祇”神的场所，也是我国现存的最大的祭地之坛。坛内总面积37.4公顷，呈方型，整个建筑朴实端庄，别具一格，从整体到局部都是遵照我国古代“天圆地方”、“天青地黄”、“天南地北”、“龙凤”、“乾坤”等传统和象征传说构思设计的。地坛现存有方泽坛、皇祇室、宰牲亭、斋宫、神库等古建筑。</text
          >
          <view
            class="button"
            @click="isShowAllText"
            :class="{ active: isShow }"
          >
            {{ isShow ? '收缩' : '展开' }}
            <image class="sym" src="@/static/Vector.png" />
          </view>
        </view>
      </view>
    </view>
    <view class="plate">
      <view class="common-title">
        健康指数
      </view>
      <view class="index-box">
        <view class="index-head">
          <view class="num-left"
            >减压指数 <text class="index-num">5</text></view
          >
          <view class="time">2021.01.09</view>
        </view>
        <view class="index-info">对减压具有一定的治愈作用</view>
        <scaleAxis />
      </view>
    </view>
    <view class="plate">
      <view class="common-title">
        健康指数
      </view>
      <view class="warning-box">
        <view class="warning-head">
          <view class="left"
            ><image src="@/static/lightning_r@2x.png"></image>
            <text class="warning-title">黄色预警</text></view
          >
          <view class="right">2021.01.09</view>
        </view>
        <view class="warning-info">
          地坛又称方泽坛，是古都北京五坛中的第二大坛。始建于明代嘉靖九年（公元1530年），坐落
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import scaleAxis from './commpents/scale-axis.vue'
import swiperDots from './commpents/swiper-dots.vue'
export default {
  components: {
    swiperDots,
    scaleAxis
  },
  data() {
    return {
      isShow: false,
      swiperCurrent: 0,
      swiperList: [
        {
          url: require('@/static/banner.png')
        },
        {
          url: require('@/static/banner.png')
        }
      ]
    }
  },
  methods: {
    swiperChange(e) {
      this.swiperCurrent = e.detail.current
    },
    isShowAllText() {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="less" scoped>
.common-title {
  font-size: 40rpx;
  font-weight: 600;
  line-height: 56rpx;
  color: #1e1e1e;
}
.swiper-view {
  position: relative;
}
.swiper-view .swiper {
  height: 562rpx;
}
.swiper image {
  width: 100%;
  height: 100%;
}
.plate {
  margin-bottom: 32rpx;
  padding: 16px;
  background-color: #fff;
}
.plate.first {
  position: relative;
  z-index: 999;
  box-sizing: border-box;
  margin-top: -32rpx;

  /* height: 384rpx; */

  border-radius: 32rpx;
  /* overflow: hidden; */
}
.info {
  font-size: 28rpx;
  line-height: 40rpx;
}
.info image {
  flex-shrink: 0;
  width: 40rpx;
  height: 40rpx;
  margin-right: 20rpx;
}
.info-item {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.info-item:last-child image {
  display: block;
  float: left;
}

.text-box {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.text-box.active {
  display: block;
}

.info-item:not(:last-child) {
  margin-bottom: 16rpx;
}
.button {
  position: absolute;
  z-index: 999;
  right: 46rpx;
  bottom: 32rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 164rpx;
  height: 40rpx;
  color: #aeaeae;
  background: linear-gradient(
    270deg,
    #fff 71.34%,
    rgba(255, 255, 255, 0) 103.05%
  );
}
.button image.sym {
  width: 20rpx;
  height: 12rpx;
  margin-right: 0;
  margin-left: 4px;
  transition: transform 0.3s;
}
.button.active image.sym {
  transform: rotate(180deg);
}
.index-box {
  margin: 32rpx 0;
}
.index-head {
  line-height: 68rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.num-left {
  font-size: 28rpx;
  display: flex;
  align-items: center;
  color: #85ca00;
}
.index-num {
  font-size: 42rpx;
  padding-left: 16rpx;
}
.time {
  font-size: 24rpx;
  color: #aeaeae;
}
.index-info {
  font-size: 28rpx;
  line-height: 40rpx;
}

.warning-box {
  margin: 24rpx 0 16rpx;

  .warning-head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .warning-info {
    line-height: 40rpx;
    color: #303030;
    margin-bottom: 48rpx;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .right {
    font-size: 24rpx;
    color: #aeaeae;
  }

  image {
    width: 48rpx;
    height: 48rpx;
    vertical-align: middle;
  }
}
</style>
