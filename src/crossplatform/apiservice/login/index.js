/**
 * 处理不同平台的api之间的差异
 * process.env.TARO_ENV
 * 用于判断当前编译类型，目前有 weapp / swan / alipay / h5 / rn 五个取值
 * */
import Taro from '@tarojs/taro'

// if (process.env.TARO_ENV === 'h5') {
// 	require('./replacement/h5')
// } else if (process.env.TARO_ENV === 'rn') {
// 	require('./replacement/rn')
// } else {
// 	require('./replacement/mini')
// }

export const login = payload => {
  if (process.env.TARO_ENV != 'h5' && process.env.TARO_ENV != 'rn') {
    return Taro.login(payload)
  } else {
    console.log('另外想办法咯')
  }
}

export const checkSession = payload => {
  if (process.env.TARO_ENV != 'h5' && process.env.TARO_ENV != 'rn') {
    return Taro.checkSession(payload)
  } else {
    console.log('另外想办法咯')
  }
}

export const checkIsSoterEnrolledInDevice = payload => {
  if (process.env.TARO_ENV != 'h5' && process.env.TARO_ENV != 'rn') {
    return Taro.checkIsSoterEnrolledInDevice(payload)
  } else {
    console.log('另外想办法咯')
  }
}

export const checkIsSupportSoterAuthentication = payload => {
  if (process.env.TARO_ENV != 'h5' && process.env.TARO_ENV != 'rn') {
    return Taro.checkIsSupportSoterAuthentication(payload)
  } else {
    console.log('另外想办法咯')
  }
}

export const startSoterAuthentication = payload => {
  if (process.env.TARO_ENV != 'h5' && process.env.TARO_ENV != 'rn') {
    return Taro.startSoterAuthentication(payload)
  } else {
    console.log('另外想办法咯')
  }
}
