import { getSystemInfoSync } from '@crossplatform/apiservice/systemInfo'

const { windowHeight, windowWidth, statusBarHeight } = getSystemInfoSync()
const dpr = windowWidth / 750
let globalData = {
  env: 'gray', // daily gray online
  windowHeight,
  dpr,
  navBarPaddingTop: statusBarHeight,
  blockWords: /微信|加微|V信|威信|QQ|VX|WX|企鹅|\+V|weixin|扣扣|保安|安保|模特|APP推广|医药|充场|撑场|试依|试衣|AP|App|信用卡|网拍|推广|摄影|主播|\d{6,}/i
}

export function setGlobalData(key, val) {
  globalData[key] = val
}

export function getGlobalData(key) {
  if (key) {
    return globalData[key]
  } else {
    return globalData
  }
}

export function getGlobalDeepData(key, id) {
  if (key) {
    const data = globalData[key]
    let second = null
    let first = data.find(e => {
      second = e.children.find(f => {
        return f.value == id
      })
      return !!second
    })
    return second ? first.key + second.name : ''
  } else {
    return null
  }
}

export function getGlobalDeepindexId(key, id) {
  if (key) {
    const data = globalData[key]
    let second = null
    let first = data.findIndex(e => {
      second = e.children.findIndex(f => {
        return f.value == id
      })
      return second >= 0
    })
    return first >= 0 && second >= 0 ? [first, second] : []
  } else {
    return []
  }
}

export function getGlobalDeepIndex(key, name) {
  if (key) {
    const data = globalData[key]
    let second = null
    let first = data.findIndex(e => {
      second = e.children.findIndex(f => {
        return e.key + f.name == name
      })
      return second >= 0
    })
    return first >= 0 && second >= 0 ? [first, second] : []
  } else {
    return []
  }
}
