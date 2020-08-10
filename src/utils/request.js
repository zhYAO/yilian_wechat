import Taro from '@tarojs/taro'
import { getStorageSync } from '@crossplatform/apiservice/storage'
// import { noConsole } from '../config'

const baseUrl = `https://www.ilove01.cn/e-link-api/`

export default (options = { method: 'GET', data: {} }) => {
  // if (!noConsole) {
  //   console.log(
  //     `${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(options.data)}`
  //   )
  // }
  return Taro.request({
    url: baseUrl + options.url,
    data: options.data,
    header: {
      'Content-Type': 'application/json',
      token: getStorageSync('token')
    },
    method: options.method.toUpperCase()
  }).then(res => {
    const { statusCode, data } = res
    // if (statusCode >= 200 && statusCode < 300) {
    //   // if (!noConsole) {
    //   //   console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`, res.data)
    //   // }
    //   if (data.status !== 'ok') {
    //     Taro.showToast({
    //       title: `${res.data.error.message}~` || res.data.error.code,
    //       icon: 'none',
    //       mask: true
    //     })
    //   }
    return data
    // } else {
    //   throw new Error(`网络请求错误，状态码${statusCode}`)
    // }
  })
}
