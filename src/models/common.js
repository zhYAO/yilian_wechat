import { getStorageSync } from '@crossplatform/apiservice/storage'

export default {
  namespace: 'common',
  state: {
    access_token: getStorageSync('access_token') || '',
    token: getStorageSync('token') || '',
    openId: getStorageSync('openId') || '',
    userId: getStorageSync('userId') || '',
    // mobile: getStorageSync('user_info') ? getStorageSync('user_info').mobile : '',
    // nickName: getStorageSync('user_info') ? getStorageSync('user_info').nickName : '',
    // new_user: getStorageSync('user_info') ? getStorageSync('user_info').new_user : '',
    // is_has_buy_card: getStorageSync('user_info')
    //   ? getStorageSync('user_info').is_has_buy_card
    //   : '',
    // erroMessage: getStorageSync('user_info')
    //   ? getStorageSync('user_info').erroMessage
    //   : '',
    tabbarIndex: 0,
    navBarHeight: 44,
    userInfo: getStorageSync('userInfo') || {},
    identity: 'member' // 用户对于公司的身份 member: 普通成员 admin: 管理员
  },

  effects: {
    *effectsUpdate({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          ...payload
        }
      })
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  subscriptions: {
    init({ dispatch }) {
    }
  }
}
