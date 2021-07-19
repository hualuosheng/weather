<template>
  <van-mask :show="show" @click="close" :zoom="zoom" :maskOpacity="maskOpacity">
    <view class="modal" @tap.stop.prevent @touchmove.stop.prevent>
      <van-icons v-show="iconType" :type="iconType" size="100" color="#ea3c3f" />
      <slot name="title">
        <view class="title" v-if="title">{{ title }}</view>
      </slot>
      <slot name="content">
        <view class="content">
          {{ content }}
        </view>
      </slot>
      <slot name="btn">
        <view class="flex flex-between btns">
          <view
            class="flex-box border cancel btn"
            size="mini"
            v-show="showCancel"
            :style="cancelColor"
            @click.stop="clickBtn('cancel')"
            >{{ cancelText }}</view
          >
          <view class="flex-box confirm btn" size="mini" :style="confirmColor" @click.stop="clickBtn('confirm')">{{
            confirmText
          }}</view>
        </view>
      </slot>
    </view>
  </van-mask>
</template>

<script>
// import vanMask from '@/components/van-mask/van-mask'
export default {
  // components: {
  //   vanMask
  // },
  computed: {
    iconType() {
      return this.$modalStore.state.iconType
    },
    show() {
      return this.$modalStore.state.show
    },
    zoom() {
      return this.$modalStore.state.zoom
    },
    title() {
      return this.$modalStore.state.title
    },
    content() {
      return this.$modalStore.state.content
    },
    showCancel() {
      return this.$modalStore.state.showCancel
    },
    cancelText() {
      return this.$modalStore.state.cancelText
    },
    cancelColor() {
      return 'color:' + this.$modalStore.state.cancelColor
    },
    confirmText() {
      return this.$modalStore.state.confirmText
    },
    confirmColor() {
      return 'color:' + this.$modalStore.state.confirmColor
    },
    maskOpacity() {
      return this.$modalStore.state.maskOpacity
    }
  },
  methods: {
    close() {
      this.$modalStore.commit('hide')
    },
    clickBtn(res) {
      this.$modalStore.commit('hide')
      this.$modalStore.commit('success', res)
    }
  },
  beforeDestroy() {
    this.$modalStore.commit('hide')
  }
}
</script>

<style lang="scss" scoped>
.modal {
  width: 540rpx;
  padding: 40rpx 30rpx;
  text-align: center;
  border-radius: 20rpx;
  background-color: #fff;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3);
}

.van-icons {
  margin: 5px auto 10px;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
  padding-bottom: 16rpx;
  text-align: center;
}
.content {
  font-size: 32rpx;
  line-height: 1.5;
}

.btns {
  margin: 20px 0 0;
  .btn {
    font-size: 28rpx;
    width: 228rpx;
    height: 60rpx;
    border-radius: 60rpx;
    background: #fff;
    // box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.05);
  }
  .cancel {
  }
  .confirm {
    color: #fff;
    background: #f2270c;
  }
}
</style>
