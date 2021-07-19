import Vuex from 'vuex'
import Vue from 'vue'
export function initModal(v) {
  // 挂在store到全局Vue原型上
  v.prototype.$modalStore = new Vuex.Store({
    state: {
      show: false,
      title: '标题',
      content: '',
      iconType: '', //icon
      shape: 'fillet', // button 形状 线性 || 圆角
      zoom: true, // 是否开启缩放动画
      maskCloseAble: true, //是否可以通过点击遮罩进行关闭
      maskOpacity: 0.8, // 设置背景色来控制是否显示遮罩
      duration: 1000, //提示的延迟时间，单位毫秒，默认：1000
      loadingNumber: 10, //loading动画 密集数
      loadingType: '', //loading动画类型  ring | ball  | flower | line
      showCancel: true,
      cancelText: '取消',
      cancelColor: '',
      confirmText: '确定',
      confirmColor: '',
      success: null
    },
    mutations: {
      hide(state) {
        // 小程序导航条页面控制
        // #ifndef H5
        if (state.hideTabBar) {
          uni.showTabBar()
        }
        // #endif
        // if (state.maskCloseAble)
        state.show = false
      },
      show(state, data) {
        state = Object.assign(state, data)
        state.show = true
      },
      success(state, res) {
        let cb = state.success
        let resObj = {
          cancel: false,
          confirm: false
        }
        res == 'confirm' ? (resObj.confirm = true) : (resObj.cancel = true)
        cb && cb(resObj)
      }
    }
  })
}

export function initDeploy(option) {
  if (typeof option === 'object') {
    // #ifndef H5
    if (option.hideTabBar) {
      uni.hideTabBar()
    }
    // #endif
    Vue.prototype.$modalStore.commit('show', option)
  } else {
    throw '配置项必须为对象传入的值为：' + typeof option
  }
}
