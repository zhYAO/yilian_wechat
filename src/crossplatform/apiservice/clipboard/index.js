/**
 * 处理不同平台的api之间的差异
 * process.env.TARO_ENV
 * 用于判断当前编译类型，目前有 weapp / swan / alipay / h5 / rn 五个取值
 * */
import Taro from '@tarojs/taro'

export const setClipboardData = payload => {
  return Taro.setClipboardData(payload)
}

export const getClipboardData = payload => {
  return Taro.getClipboardData(payload)
}
