/**
 * 处理不同平台的api之间的差异
 * process.env.TARO_ENV
 * 用于判断当前编译类型，目前有 weapp / swan / alipay / h5 / rn 五个取值
 * */
import Taro from '@tarojs/taro'

export const showToast = ({ mask = true, icon = 'none', duration = 1500, ...payload } = {}) => {
  return Taro.showToast({
    icon,
    mask,
    duration,
    ...payload
  })
}

export const showLoading = ({ mask = true, icon = 'none', title = '请求中', ...payload } = {}) => {
  return Taro.showLoading({
    title,
    icon,
    mask,
    ...payload
  })
}

export const hideToast = payload => {
  return Taro.hideToast(payload)
}

export const hideLoading = payload => {
  return Taro.hideLoading(payload)
}

export const showModal = payload => {
  return Taro.showModal(payload)
}

export const showActionSheet = payload => {
  return Taro.showActionSheet(payload)
}
