/**
 * 处理不同平台的api之间的差异
 * process.env.TARO_ENV
 * 用于判断当前编译类型，目前有 weapp / swan / alipay / h5 / rn 五个取值
 * */
import Taro from '@tarojs/taro'

if (process.env.TARO_ENV === 'h5') {
  require('./replacement/h5')
} else if (process.env.TARO_ENV === 'rn') {
  require('./replacement/rn')
} else {
  require('./replacement/mini')
}

export const getSystemInfo = payload => {
  return Taro.getSystemInfo(payload)
}

export const getSystemInfoSync = payload => {
  return Taro.getSystemInfoSync(payload)
}

export const canIUse = payload => {
  if (process.env.TARO_ENV != 'h5' && process.env.TARO_ENV != 'rn') {
    return Taro.canIUse(payload)
  }
}
