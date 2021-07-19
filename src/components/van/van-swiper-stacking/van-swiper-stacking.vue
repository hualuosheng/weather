<template>
  <swiper class="van-swiper-stacking" previous-margin="32rpx" next-margin="32rpx" :style="{ height: height + 'rpx' }" @change="swiperChange">
    <swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
      <view class="swiper-slot--box" :class="{ 'swiper-slot--box__active': currentIndex == index }" @click="clickImg(item)">
        <view class="flex-box fs34 fw600 title">{{ item.title }}</view>
        <view class="flex align-start p32">
          <van-image src="/static/img/user_logo.png" width="164" height="164"></van-image>
          <view class="ml16">
            <view class="fw600 info-title">李国平</view>
            <view class="note">主治医师 | 内科综合门诊</view>
            <view class="note color-middle">山西省晋中市第一人民医院</view>
          </view>
        </view>
      </view>
      <!-- <image class="swiper-img" :src="item[urlKey]" lazy-load mode="aspectFill" ></image> -->
    </swiper-item>
  </swiper>
</template>
<script>
export default {
  name: 'van-swiper-stacking',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    height: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    swiperChange(e) {
      this.currentIndex = e.detail.current
    }
    // clickImg(item) {
    //   this.$emit('selected', item, this.currentIndex)
    // }
  }
}
</script>
<style lang="scss" scoped>
.swiper-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.swiper-slot--box {
  overflow: hidden;
  width: calc(100% - 32rpx);
  height: 80%;
  transition: all 0.3s;
  border-radius: 20rpx;
  background-color: #fff;
  box-shadow: 10rpx 10rpx #0000;
  .title {
    height: 100rpx;
    color: #fff;
    background-color: #478dff;
  }
  .info-title {
    font-size: 44rpx;
    margin-top: 20rpx;
  }
  .note {
    margin-top: 32rpx;
    font-size: 30rpx;
  }
  .note:last-child {
    font-size: 28rpx;
  }
}

.swiper-slot--box__active {
  height: 90% !important;
}
</style>
