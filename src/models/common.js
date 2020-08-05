import { getStorageSync } from '@crossplatform/apiservice/storage'
import { getSystemInfo } from '@crossplatform/apiservice/systemInfo'

export default {
  namespace: 'common',
  state: {
    access_token: getStorageSync('access_token') || '',
    token: getStorageSync('token') || '',
    openId: getStorageSync('openId') || '',
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
    navBarPaddingTop: 22,
    navBarHeight: 44,
    userInfo: getStorageSync('userInfo') || {}
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
      getSystemInfo({}).then(res => {
        dispatch({
          type: 'updateState',
          payload: {
            navBarPaddingTop: res.statusBarHeight || 22,
            serviceInfo: res
          }
        })
      })
    }
  }
}
