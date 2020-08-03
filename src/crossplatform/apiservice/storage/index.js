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

export const setStorage = payload => {
  return Taro.setStorage(payload)
}

export const setStorageSync = (key, payload) => {
  if (process.env.TARO_ENV != 'rn') {
    return Taro.setStorageSync(key, payload)
  } else {
    console.log('另外想办法')
  }
}

export const getStorage = payload => {
  return Taro.getStorage(payload)
}

export const getStorageSync = payload => {
  if (process.env.TARO_ENV != 'rn') {
    return Taro.getStorageSync(payload)
  } else {
    console.log('另外想办法')
  }
}

export const getStorageInfo = payload => {
  return Taro.getStorageInfo(payload)
}

export const getStorageInfoSync = payload => {
  if (process.env.TARO_ENV != 'rn') {
    return Taro.getStorageInfoSync(payload)
  } else {
    console.log('另外想办法')
  }
}

export const removeStorage = payload => {
  return Taro.removeStorage(payload)
}

export const removeStorageSync = payload => {
  if (process.env.TARO_ENV != 'rn') {
    return Taro.removeStorageSync(payload)
  } else {
    console.log('另外想办法')
  }
}

export const clearStorage = () => {
  return Taro.clearStorage()
}

export const clearStorageSync = () => {
  if (process.env.TARO_ENV != 'rn') {
    return Taro.clearStorageSync()
  } else {
    console.log('另外想办法')
  }
}
