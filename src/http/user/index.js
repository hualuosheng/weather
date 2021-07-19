import http from '../instance'

export default {
  //登录
  outhLogin(params) {
    return http.get(`Back/Physician/Login.shtml?code=${params}`)
  },
  //获取手机号
  getPhoneNumber(params) {
    return http.post('Api/Login/getPhoneNumber.shtml', params)
  },

  //模糊查询医院
  HosSearch(params) {
    return http.post('Back/Hospital/Search.shtml', params)
  },
  //模糊查询科室
  DepSearch(params) {
    return http.post('Back/Department/SearchPage.shtml', params)
  },
  //用户完善信息
  SaveOrUpdate(params) {
    return http.post('Back/Physician/SaveOrUpdate.shtml', params)
  },
  //获取usersig
  GetuserSig(params) {
    return http.post('GetUserSig.shtml', params)
  }
}
