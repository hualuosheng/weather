class VueTouch {
  constructor(event) {
    this.vueTouches = { x: 0, y: 0 }
    this.vueMoves = false
    this.vueLeave = true
    this.longTouch = true
    this.vueCallBack = null
    this.touchType = 5
  }

  start() {
    // this.vueMoves = true
    // this.vueLeave = true
    // this.longTouch = true
    // this.vueTouches = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY }
    // this.time = setTimeout(
    //   function() {
    //     if (this.vueLeave && this.vueMoves) {
    //       this.touchType == 'longtap' && this.vueCallBack()
    //       this.longTouch = false
    //     }
    //   }.bind(this),
    //   1000
    // )
  }
  end(e) {
    // var disX = e.changedTouches[0].pageX - this.vueTouches.x
    // var disY = e.changedTouches[0].pageY - this.vueTouches.y
    // clearTimeout(this.time)
    // if (Math.abs(disX) > 10 || Math.abs(disY) > 100) {
    //   this.touchType == 'swipe' && this.vueCallBack(e)
    //   if (Math.abs(disX) > Math.abs(disY)) {
    //     if (disX > 10) {
    //       this.touchType == 'swiperight' && this.vueCallBack(e)
    //     }
    //     if (disX < -10) {
    //       this.touchType == 'swipeleft' && this.vueCallBack(e)
    //     }
    //   } else {
    //     if (disY > 10) {
    //       this.touchType == 'swipedown' && this.vueCallBack(e)
    //     }
    //     if (disY < -10) {
    //       this.touchType == 'swipeup' && this.vueCallBack(e)
    //     }
    //   }
    // } else {
    //   if (this.longTouch && this.vueMoves) {
    //     this.touchType == 'tap' && this.vueCallBack(e)
    //     this.vueLeave = false
    //   }
    // }
  }
  move(e) {
    // this.vueMoves = false
  }
}

class Star {
  constructor(name) {
    // constructor中的this指向的是创建的实例对象
    console.log(this)
  }
}

var starObj = new Star('Liu')

// console.log(starObj)
// const touch = new vueTouch()

export { VueTouch }
