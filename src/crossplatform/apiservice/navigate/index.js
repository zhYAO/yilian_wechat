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

export const navigateTo = payload => {
  return Taro.navigateTo(payload)
}

export const redirectTo = payload => {
  return Taro.redirectTo(payload)
}

export const switchTab = payload => {
  if (process.env.TARO_ENV != 'h5') {
    return Taro.switchTab(payload)
  } else {
    return Taro.navigateTo(payload)
  }
}

export const navigateBack = payload => {
  return Taro.navigateBack(payload)
}

export const reLaunch = payload => {
  if (process.env.TARO_ENV != 'h5') {
    return Taro.reLaunch(payload)
  } else {
    return Taro.navigateTo(payload)
  }
}

export const getCurrentPages = payload => {
  if (process.env.TARO_ENV != 'h5') {
    return Taro.getCurrentPages(payload)
  } else {
    return Taro.navigateTo(payload)
  }
}
