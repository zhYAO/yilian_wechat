import Taro from '@tarojs/taro'
import { getStorageSync } from '@crossplatform/apiservice/storage'
import { showToast } from '@crossplatform/apiservice/toast'
import { getGlobalData } from '@configuration/globaldata'
// import { noConsole } from '../config'

const baseUrl = getGlobalData('API_URL')

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
    const {
      data: { code, message },
      data
    } = res
    if (code === '0000') {
      return data
    } else {
      if(typeof data === 'object') {
        showToast({
          title: message || '稍等'
        })
      }
      return {}
    }
  })
}
