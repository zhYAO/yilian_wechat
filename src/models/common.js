import Taro from '@tarojs/taro'

export default {
  namespace: 'common',
  state: {
    access_token: Taro.getStorageSync('access_token'),
    mobile: Taro.getStorageSync('user_info') ? Taro.getStorageSync('user_info').mobile : '',
    nickname: Taro.getStorageSync('user_info') ? Taro.getStorageSync('user_info').nickname : '',
    new_user: Taro.getStorageSync('user_info') ? Taro.getStorageSync('user_info').new_user : '',
    is_has_buy_card: Taro.getStorageSync('user_info')
      ? Taro.getStorageSync('user_info').is_has_buy_card
      : '',
    erroMessage: Taro.getStorageSync('user_info')
      ? Taro.getStorageSync('user_info').erroMessage
      : '',
    tabbarIndex: 0,
    navBarPaddingTop: 22,
    navBarHeight: 44
  },

  effects: {},

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  subscriptions: {
    init({ dispatch }) {
      Taro.getSystemInfo({}).then(res => {
        console.log(res, 'dsfasdfadf')
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
