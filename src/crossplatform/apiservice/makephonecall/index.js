/**
 * 处理不同平台的api之间的差异
 * process.env.TARO_ENV
 * 用于判断当前编译类型，目前有 weapp / swan / alipay / h5 / rn 五个取值
 * */
import Taro from '@tarojs/taro'

export const makePhoneCall = payload => {
  if (process.env.TARO_ENV != 'h5' && process.env.TARO_ENV != 'rn') {
    return Taro.makePhoneCall(payload)
  } else {
    console.log('另外想办法咯')
  }
}
