/**
 * 处理不同平台的api之间的差异
 * process.env.TARO_ENV
 * 用于判断当前编译类型，目前有 weapp / swan / alipay / h5 / rn 五个取值
 * */
import Taro from '@tarojs/taro'

let H5Replacement
if (process.env.TARO_ENV == 'h5') {
  H5Replacement = require('./replacement/h5')
} else if (process.env.TARO_ENV === 'rn') {
  require('./replacement/rn')
} else {
  require('./replacement/mini')
}
export const createSelectorQuery = (context) => {
  if (process.env.TARO_ENV == 'h5') {
    return H5Replacement.createSelectorQueryFn()
  } else if (process.env.TARO_ENV == 'rn') {
    console.log('另外想办法！')
  } else {
    return Taro.createSelectorQuery().in(context.$scope)
  }
}

export const createIntersectionObserver = (payload) => {
  if (process.env.TARO_ENV == 'h5') {
    return H5Replacement.CreateIntersectionObserver(payload)
  } else if (process.env.TARO_ENV != 'rn') {
    return Taro.createIntersectionObserver(payload)
  } else {
    return {}
  }
}