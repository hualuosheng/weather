import {
  LOGIN_USERS,
  LOGOUT_USERS,
  LOGIN_PHONE,
  LOGIN_INFO,
  LOGIN_BLSTATUS,
  LOGIN_LONGID
} from '../mutation-types/user'

export default {
  namespaced: true,
  state: {
    user_info: '',
    token_user: '',
    phone_number: '',
    bl_status: '',
    long_id:''
  },
  getters: {
    get_userInfo(state) {
      return state.user_info
    }
  },
  mutations: {
    [LOGIN_USERS](state, provider) {
      state.token_user = provider
    },
    [LOGIN_PHONE](state, provider) {
      state.phone_number = provider
    },
    [LOGIN_INFO](state, provider) {
      state.user_info = provider
    },
    [LOGIN_LONGID](state, provider) {
      state.long_id = provider
    },
    [LOGIN_BLSTATUS](state, provider) {
      state.bl_status = provider
    },
    [LOGOUT_USERS](state) {
      state.user_info = {}
    }
  }
}
