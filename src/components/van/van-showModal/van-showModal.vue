<template>
  <van-mask :show="show" @click="close" :zoom="zoom" :maskOpacity="maskOpacity">
    <view class="modal" @tap.stop.prevent @touchmove.stop.prevent>
      <van-icons type="warning" size="100" color="#ea3c3f"></van-icons>
      <!-- <slot name="title">
          <view class="title" v-show="title">{{ title }}</view>
        </slot> -->
      <slot name="content">
        <view class="content">
          {{ content }}
        </view>
      </slot>
      <slot name="btn">
        <view class="flex flex-between btns">
          <view class="flex-box cancel btn" size="mini" v-show="showCancel" :style="cancelColor" @click.stop="clickBtn('cancel')">{{ cancelText }}</view>
          <view class="flex-box confirm btn" size="mini" :style="confirmColor" @click.stop="clickBtn('confirm')">{{ confirmText }}</view>
        </view>
      </slot>
    </view>
  </van-mask>
</template>

<script>
import vanMask from '@/components/van/van-mask/van-mask'
export default {
  components: {
    vanMask
  },
  computed: {
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
  padding: 40rpx 30rpx 30rpx;
  text-align: center;
  border-radius: 20rpx;
  background-color: #fff;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3);
}

.yticon {
  display: block;
  margin: 5px auto 10px;
}

// .title {
//   font-size: 26rpx;
//   font-weight: bold;
//   line-height: 40rpx;
//   height: 40rpx;
//   padding: 15rpx 0 0;
//   text-align: center;
//   // border-bottom: 1rpx solid #e1e1e1;
// }
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
    border: 1px solid #ccc;
    border-radius: 40rpx;
    background: #fff;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.05);
  }

  .confirm {
    color: #fff;
    border: none;
    background: #f2270c;
  }
}
</style>
