<template>
  <view class="container">
    <view class="piece" @click="routerLink">
      <view class="common-title">
        海棠公园
      </view>
      <view class="contnet">
        <view class="info">
          <image class="icon-gy" src="@/static/gongyuan@2x.png"></image>
          <view class="info-title">
            地坛又称方泽坛，是古都北京五坛中的第二大
          </view>
        </view>
        <image class="info-img" src="@/static/rectangle.png"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      list: [
        {
          value: '',
          label: '穿衣指数'
        },
        {
          value: '',
          label: '穿衣指数'
        },
        {
          value: '',
          label: '穿衣指数'
        },
        {
          value: '',
          label: '穿衣指数'
        }
      ]
    }
  },
  onLoad() {},
  methods: {
    routerLink() {
      console.log(7779999999999999)
      uni.navigateTo({
        url: '/sub-packages/detail/index?id=1&name=uniapp'
      })
    }
  }
}
</script>

<style>
.piece {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 16px;
}

.info {
  display: flex;
  align-items: center;
  font-size: 28rpx;
  padding-left: 4rpx;
  line-height: 40rpx;
}

.icon-gy {
  width: 40rpx;
  height: 40rpx;
  margin-right: 20rpx;
}

.info-img {
  width: 100%;
  height: 306rpx;
  margin: 24rpx 0;
}

.common-title {
  padding: 32rpx 0 12rpx;
  line-height: 56rpx;
  font-weight: 600;
  font-size: 40rpx;
  color: #1e1e1e;
}
</style>
