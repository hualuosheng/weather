import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import user from '@/store/user'
import wechatim from '@/store/wechatim'

Vue.use(Vuex)

export default new Vuex.Store({
  // 做模块化处理,每个功能一个store.js文件,然后统一在这边引入
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState({
      // key: 'users', // 状态保存到本地的 key
      paths: ['user','wechatim'], // 要持久化的状态，在state里面取，如果有嵌套，可以  a.b.c
      storage: {
        // 存储方式定义
        getItem: key => uni.getStorageSync(key), // 获取
        setItem: (key, value) => uni.setStorageSync(key, value), // 存储
        removeItem: key => uni.removeStorageSync(key) // 删除
      }
    })
  ],
  modules: {
    user,
    wechatim
  }
})
