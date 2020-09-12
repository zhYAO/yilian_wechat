import { setStorageSync } from '@crossplatform/apiservice/storage'
import { login } from '@crossplatform/apiservice/login'
import { wxLoginRequest } from '@service/login-controller'
import { showToast } from '@crossplatform/apiservice/toast'

const wxLogin = {
  doLogin: () => {
    return new Promise(resolve => {
      // 登录逻辑
      wxLogin.goLoginFunc(resolve)
    })
  },
  goLoginFunc: resolve => {
    login().then(({ code }) => {
      if (code) {
        wxLoginRequest({ code }).then(({ data = {} } = {}) => {
          const { miniOpenid: openId, token, userId } = data || {}
          if (openId) {
            setStorageSync('openId', openId)
            setStorageSync('token', token)
            setStorageSync('userId', userId)
            resolve({ openId, token, userId })
          } else {
            showToast({
              title: '网络走丢了'
            })
            resolve()
          }
        })
      } else {
        showToast({
          title: '网络走丢了'
        })
        resolve()
      }
    })
  }
}

export default wxLogin
