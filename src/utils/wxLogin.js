import { setStorageSync } from '@crossplatform/apiservice/storage'
import { login } from '@crossplatform/apiservice/login'
import { wxLoginRequest } from '@service/login-controller'
// import { getSystemInfo } from '@crossplatform/apiservice/systemInfo'
// import { getArchiveInfoRequest } from '../service/user-info-controller'
import { showToast } from '@crossplatform/apiservice/toast'

const wxLogin = {
  doLogin: () => {
    return new Promise(resolve => {
      // 登录逻辑
      // wxLogin.setPhoneModal()
      wxLogin.goLoginFunc(resolve)
    })
  },
  goLoginFunc: resolve => {
    login().then(({ code }) => {
      if (code) {
        wxLoginRequest({ code }).then(({ data = {} } = {}) => {
          const { miniOpenid: openId, token } = data || {}
          if (openId) {
            setStorageSync('openId', openId)
            setStorageSync('token', token)
            resolve({ openId, token })
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
  },
  getCUserInfo: ({ id, resolve }) => {
    wxLogin.props.getZhichuUserInfo({ userId: id }).then(({ zhichuUserId }) => {
      if (zhichuUserId) {
      } else {
        wxLogin.props.updateUserState({
          userId: id
        })
        // showToast({
        //   title: '网络走丢了'
        // })
      }
      resolve()
    })
  },
  getBUserInfo: ({ id, resolve }) => {
    wxLogin.props.getZhichuBUserInfo({ userId: id }).then(({ zhichuUserIdB }) => {
      if (zhichuUserIdB) {
        wxLogin.doOnShow(resolve)
      } else {
        wxLogin.props.updateUserState({
          userId: id
        })
        // showToast({
        //   title: '网络走丢了'
        // })
        resolve()
      }
    })
  },
  doOnShow: resolve => {
    wxLogin.tryAsyncCompanyId(resolve)
  },
  tryAsyncCompanyId: resolve => {
    // b的userId role为company 且没有公司Id时尝试去同步公司id
    const { role, zhichuUserIdB } = wxLogin.props
    if (role == 'company' && zhichuUserIdB) {
      wxLogin.props.updateCompany()
    }
    resolve()
  }
  // setPhoneModal: () => {
  //   getSystemInfo({
  //     success: res => {
  //       let brand = res.brand
  //       let isiPhone = false
  //       if (brand == 'iPhone') {
  //         isiPhone = true
  //       }
  //       setStorageSync('iPhone', isiPhone)
  //     }
  //   })
  // },
  // getArchiveInfo: () => {
  //   return new Promise(resolve => {
  //     // 获取用户资料   设置简历完成度
  //     getArchiveInfoRequest({}).then(({ data }) => {
  //       const { code, entry } = data
  //       if (code === 200) {
  //         // 设置简历完成度
  //         const { archiveComplete } = entry
  //         wxLogin.props.updateUserState({
  //           archiveComplete
  //         })
  //       }
  //       resolve()
  //     })
  //   })
  // }
}

export default wxLogin
