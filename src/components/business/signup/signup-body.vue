<template>
  <view class="container">
    <view class="left-bottom-sign"></view>
    <view class="back-btn yticon icon-zuojiantou-up" @click="navBack()"></view>
    <view class="right-top-sign"></view>
    <!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
    <view class="wrapper">
      <view class="left-top-sign">{{ allTitle.topTitle }}</view>
      <view class="welcome">
        欢迎回来！
      </view>
      <slot></slot>
    </view>
    <view v-if="publicType === 'phone' || publicType === 'register'" class="footer-section">
      {{ allTitle.resInfo }}
      <text @click="toRegist">{{ allTitle.resTitle }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    allTitle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    publicType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    navBack() {
      uni.navigateBack()
    },
    toRegist() {
      let url = this.allTitle.topTitle === 'LOGIN' ? '/pages/signup/register' : '/pages/signup/login'
      uni.redirectTo({
        url: url
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 115px;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #fff;
}

.wrapper {
  position: relative;
  z-index: 90;
}

.back-btn {
  position: absolute;
  left: 40rpx;
  z-index: 9999;
  padding-top: var(--status-bar-height);
  top: 40rpx;
  font-size: 40rpx;
}

.left-top-sign {
  font-size: 120rpx;
  color: $page-color-base;
  position: relative;
  left: -16rpx;
}

.right-top-sign {
  position: absolute;
  top: 80rpx;
  right: -30rpx;
  z-index: 95;

  &:before,
  &:after {
    display: block;
    content: '';
    width: 400rpx;
    height: 80rpx;
    background: #b4f3e2;
  }

  &:before {
    transform: rotate(50deg);
    border-radius: 0 50px 0 0;
  }

  &:after {
    position: absolute;
    right: -198rpx;
    top: 0;
    transform: rotate(-50deg);
    border-radius: 50px 0 0 0;
    /* background: pink; */
  }
}

.left-bottom-sign {
  position: absolute;
  left: -270rpx;
  bottom: -320rpx;
  border: 100rpx solid #d0d1fd;
  border-radius: 50%;
  padding: 180rpx;
}

.welcome {
  position: relative;
  left: 50rpx;
  top: -90rpx;
  font-size: 46rpx;
  color: #555;
  text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
}

.footer-section {
  position: absolute;
  left: 0;
  bottom: 50rpx;
  width: 100%;
  font-size: 15px;
  color: $u-tips-color;
  text-align: center;

  text {
    color: $u-type-primary;
    margin-left: 10rpx;
  }
}
</style>
