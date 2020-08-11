import Request from '../utils/request'

/**
 * 关注作者
 */
export const attentionRequest = data => {
  return Request({
    url: '/user/attention',
    method: 'POST',
    data
  })
}

/**
 * 取消关注作者
 */
export const attentionRemoveRequest = data => {
  return Request({
    url: '/user/attention/remove',
    method: 'POST',
    data
  })
}

/**
 * 修改用户资料
 */
export const modifyUserInfoRequest = data => {
  return Request({
    url: '/user/modify',
    method: 'POST',
    data
  })
}

/**
 * 更新用户所处行业
 */
export const modifyLabelRequest = data => {
  return Request({
    url: `/user/modify/label`,
    method: 'PUT',
    data
  })
}

/**
 * 获取用户收藏列表
 */
export const favoriteListRequest = data => {
  return Request({
    url: `/user/favorite/list`,
    method: 'GET',
    data
  })
}

/**
 * 点赞
 */
export const fabulousRequest = data => {
  return Request({
    url: '/user/fabulous',
    method: 'POST',
    data
  })
}

/**
 * 取消点赞
 */
export const fabulousRemoveRequest = data => {
  return Request({
    url: '/user/fabulous/disable',
    method: 'POST',
    data
  })
}

/**
 * 收藏
 */
export const favoriteRequest = data => {
  return Request({
    url: '/user/favorite',
    method: 'POST',
    data
  })
}

/**
 * 取消收藏
 */
export const favoriteRemoveRequest = data => {
  return Request({
    url: '/user/favorite/remove',
    method: 'POST',
    data
  })
}

/**
 * 用户发布个人动态
 */
export const publishRequest = data => {
  return Request({
    url: '/dynamic/publish/user',
    method: 'POST',
    data
  })
}

/**
 * 我的关注
 */
export const myAttentionRequest = data => {
  return Request({
    url: '/user/attention/self',
    method: 'GET',
    data
  })
}

/**
 * 我的粉丝
 */
export const myFansRequest = data => {
  return Request({
    url: '/user/fans/self',
    method: 'GET',
    data
  })
}

/**
 * 我参与的
 */
export const myTakepartRequest = data => {
  return Request({
    url: '/user/take-part',
    method: 'GET',
    data
  })
}
