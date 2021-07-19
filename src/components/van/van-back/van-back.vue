<template>
  <van-icons
    type="go-back"
    size="50"
    class="van-icons-back"
    @click="_onClick"
  />
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    _onClick() {
      this.navigateBackPage()
    },
    navigateBackPage() {
      let pages = getCurrentPages() // 获取加载的页面
      let max = pages.length !== 1 ? 2 : pages.length
      let currentPage = pages[pages.length - max] // 获取上一个页面的对象
      // #ifdef H5
      let prePage = currentPage
      // #endif
      // #ifndef H5
      let prePage = currentPage.$vm
      // #endif
      if (pages.length === 1) {
        uni.switchTab({ url: '/pages/tabs/home' })
      } else {
        uni.navigateBack()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-icons-back {
  position: fixed;
  /* #ifdef H5 */
  top: 44px;
  /* #endif */
  /* #ifndef H5 */
  top: calc(var(--status-bar-height) + 10px);
  /* #endif */
  left: 40rpx;
}
</style>
