// 全局挂载的方法
// toast提示，对uni.showToast的封装
import toast from './function/toast.js'

// 引入全局mixin
import vanMixin from './mixin/mixin.js'

//全局 index
import zIndex from './function/zIndex.js'

// 生成全局唯一guid字符串
import guid from './function/guid.js'

// 规则检验
import test from './function/test.js'
// 去除空格
import trim from './function/trim.js'
// 添加单位
import addUnit from './function/addUnit.js'
// 获取父组件参数
import getParent from './function/getParent.js'
// 获取整个父组件
import $parent from './function/$parent.js'

const $u = {
  guid,
  test,
  $parent,
  addUnit,
  trim,
  toast,
  zIndex,
  getRect: null
}

export { $u, vanMixin }
