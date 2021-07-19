<template>
  <van-mask :show="show" @click="close" :zoom="zoom" :maskOpacity="maskOpacity" :maskClickAble="maskClickAble">
    <view class="loading" @tap.stop.prevent @touchmove.stop.prevent>
      <van-icons :type="iconType" size="100" color="#fff"></van-icons>
      <slot name="title">
        <view class="title" v-show="title">{{ title }}</view>
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
    show() {
      return this.$modalStore.state.show
    },
    zoom() {
      return this.$modalStore.state.zoom
    },
    title() {
      return this.$modalStore.state.title
    },
    iconType() {
      return this.$modalStore.state.iconType
    },
    maskOpacity() {
      return this.$modalStore.state.maskOpacity
    },
    maskClickAble() {
      return this.$modalStore.state.maskClickAble
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
.loading {
  width: auto;
  min-width: 128px;
  max-width: 270px;
  padding: 20px 15px 15px;
  text-align: center;
  color: #fff;
  border-radius: 20rpx;
  background-color: rgba(0, 0, 0, 0.6);
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3);
}

.van-icons {
  margin: 5px auto 10px;
}

.title {
  text-align: center;
  line-height: 1.5;
}
</style>
