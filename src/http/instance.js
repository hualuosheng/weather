import Request from '@/common/libs/luch-request'

import projectConfig from '@/common/config/projectConfig'

import msg from '@/common/libs/message'

import store from '@/store'

const instance = new Request()

instance.setConfig(config => {
  /* 设置全局配置 */
  config.baseURL = projectConfig.baseUrl
  config.header = {
    ...config.header,
    'content-type': 'application/x-www-form-urlencoded'
  }
  return config
})

instance.interceptors.request.use(
  config => {
    /* 请求之前拦截器。可以使用async await 做异步操作 */
    config.header = {
      ...config.header,
      Authorization: store.state.user.token_user
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

let loginLock = false

// instance.interceptors.response.use(
//   res => {
//     if (res.statusCode == 200) {
//       if (!store.state.users.has_login && !loginLock) {
//         msg.alert(0, callback => {
//           if (callback) {
//             loginLock = true
//             console.log('用户点击确定')
//           } else {
//             loginLock = false
//             console.log('用户点击取消')
//           }
//         })
//       }
//       return res
//     }
//   },
//   err => {
//     // 请求错误做点什么。可以使用async await 做异步操作
//     console.log(err, '----------------')
//     errorHandle(err.status, err.data)
//     return Promise.reject(err)
//   }
// )

instance.interceptors.response.use(
  res => {
    if (res.statusCode == 200) {
      return res
    }
  },
  err => {
    errorHandle(err.status, err.data)
    return Promise.reject(err)
  }
)

const errorHandle = (status, other) => {
  switch (status) {
    case 400:
      console.log('信息校验失败')
      break
    case 401:
      console.log('认证失败')
      break
    case 403:
      console.log('token校验失败')
      break
    case 404:
      console.log('请求的资源不存在')
      break
    default:
      console.log(other)
      break
  }
}

export default instance
