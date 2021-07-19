<template>
  <view class="cart-flying">
    <div v-for="ball in balls" :key="ball.index">
      <transition name="drop" @before-enter="beforeEnter" @enter="Enter" @after-enter="afterEnter">
        <div class="ball" v-show="ball.show" :style="postStyle">
          <div class="inner inner-hock">
            <image :src="cartFlyingUrl ? cartFlyingUrl : imgError" class="inner-img" mode="center" />
          </div>
        </div>
      </transition>
    </div>
  </view>
</template>

<script>
export default {
  name: 'van-flying',
  props: {
    cartBasketRect: {
      // 购物车篮的rect信息
      type: Object,
      default: () => {
        return {}
      }
    },
    cartFlyingUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false,
      imgError: require('@/static/img/empty/error_img.jpg'),
      balls: [],
      dropBalls: [],
      flage: false,
      postStyle: '',
      offsetX: 0,
      offsetY: 0
    }
  },
  created() {
    for (let i = 0; i < 5; i++) {
      this.balls.push({
        show: false
      })
    }
  },
  methods: {
    // 监听缩放动画完成之后,执行抛物线动画
    transitionEnd() {
      this.dropBall()
    },

    openAnimation() {
      const { windowWidth, windowHeight } = uni.getSystemInfoSync()
      let x = windowWidth / 2 - 25
      let y = windowHeight / 2 - 25

      this.postStyle = `left:${this.cartBasketRect.left}px;top:${this.cartBasketRect.top}px` //初始化小球位置

      this.offsetX = x - (this.cartBasketRect.left + this.cartBasketRect.width / 2)
      this.offsetY = y - this.cartBasketRect.top + this.cartBasketRect.height / 2

      this.dropBall()
    },

    dropBall() {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true

          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeEnter(el) {
      /* 购物车小球动画实现 */
      let count = this.balls.length

      while (count--) {
        let ball = this.balls[count]

        if (ball.show) {
          el.style.display = ''

          let inner = el.getElementsByClassName('inner-hock')[0]
          inner.style.transform = `scale(1)`

          el.style.webkitTransform = 'translateY(' + this.offsetY + 'px)'
          el.style.transform = 'translateY(' + this.offsetY + 'px)'

          inner.style.webkitTransform = 'translateX(' + this.offsetX + 'px)'
          inner.style.transform = 'translateX(' + this.thisoffsetX + 'px)'
        }
      }
    },
    Enter(el, done) {
      /*重置小球数量  样式重置*/

      // setTimeout(function() {

      let rf = el.offsetHeight

      let inner = el.getElementsByClassName('inner-hock')[0]

      el.style.webkitTransform = 'translate3d(0,0,0)'
      el.style.transform = 'translate3d(0,0,0)'

      inner.style.webkitTransform = 'translate3d(0,0,0)'
      inner.style.transform = 'translate3d(0,0,0)'

      inner.style.transform = `scale(0.5)`

      el.addEventListener('transitionend', done)
      // }, 0)
    },

    afterEnter(el) {
      /*初始化小球*/
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  }
}
</script>

<style scoped>
.ball {
  position: fixed;
  z-index: 79;
  top: 0;
  /* transition: all 0.5s cubic-bezier(0.6, -0.63, 0.94, 0.71); */
  /* transition: all 0.5s cubic-bezier(0.49, 0.15, 0.65, 0.2); */
  transition: all 0.5s cubic-bezier(0.55, 0, 0.85, 0.36);
  /* transition-timing-function: cubic-bezier(); */
}

.inner {
  width: 100rpx;
  height: 100rpx;
  overflow: hidden;
  border-radius: 50%;
  background-color: transparent;
  transition: all 0.5s linear;
}

.inner-img {
  width: 100rpx;
  height: 100rpx;
}
</style>
