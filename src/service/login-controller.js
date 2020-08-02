import Request from '../utils/request';

/**
 * 小程序获取openid
 */
export const wxLoginRequest = ({ code }) => {
  // return wechatrequest.postparams(
  //   `@@/auth/token`,
  //   {
  //     data: {
  //       code,
  //       grant_type: 'wx_openid'
  //     }
  //   },
  //   true
  // )
  return Request({
    url: '/user/login',
    method: 'GET',
    data: {
      code,
      grant_type: 'wx_openid'
    },
  });
}

/**
 * 登录
 */
export const loginRequest = ({ mobile, code, type, identifier }) => {
  return wechatrequest.post(`@@/auth/mobile/change`, {
    data: { mobile, code, type, identifier }
  })
}

/**
 * 手机号登录解密数据
 */
export const extractPhoneRequest = ({ openId, encryptedData, iv }) => {
  return wechatrequest.post(`@@/weixin/eptdata/extract`, {
    data: { openId, encryptedData, iv }
  })
}

/**
 * 手机号一键登录
 */
export const bindPhoneRequest = ({ openId, mobile }) => {
  return wechatrequest.post(`@@/auth/mobile/bind`, {
    data: {
      identifier: openId,
      type: 'openId',
      mobile,
      code: ''
    }
  })
}