import Vue from 'vue'

import { initModal, initDeploy } from './initModal.js'

import vanShowModal from './van-showModal'
import vanShowLoading from './van-showLoading'
import vanShowToast from './van-showToast'

initModal(Vue)

const ShowModal = Vue.extend({
  render(createElement) {
    return createElement(vanShowModal)
  }
})

const ShowLoading = Vue.extend({
  render(createElement) {
    return createElement(vanShowLoading)
  }
})

const ShowToast = Vue.extend({
  render(createElement) {
    return createElement(vanShowToast)
  }
})

/* 
禁止重复挂载 
重复挂载会导致缩放失效
*/
let initial = true

const showModal = options => {
  if (initial) {
    new ShowModal().$mount('uni-modal')
    initial = false
  }
  initDeploy(options)
}

const showLoading = options => {
  if (initial) {
    new ShowLoading().$mount('uni-modal')
    initial = false
  }
  initDeploy(options)
}

const showToast = options => {
  if (initial) {
    new ShowToast().$mount('uni-modal')
    initial = false
  }
  initDeploy(options)
}

Vue.prototype.$showModal = showModal
Vue.prototype.$showLoading = showLoading
Vue.prototype.$showToast = showToast

// export { showModal, showLoading, showToast }
