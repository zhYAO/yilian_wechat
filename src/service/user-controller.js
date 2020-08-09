import Request from '../utils/request'

/**
 * 关注作者
 */
export const attentionRequest = ({ id }) => {
  return Request({
    url: '/user/attention',
    method: 'POST',
    data: {
      userId: id
    }
  })
}

/**
 * 取消关注作者
 */
export const attentionRemoveRequest = ({ id }) => {
  return Request({
    url: '/user/attention/remove',
    method: 'POST',
    data: {
      userId: id
    }
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
export const fabulousRequest = ({ id, type }) => {
  return Request({
    url: '/user/fabulous',
    method: 'POST',
    data: {
      foreignId: id,
      type
    }
  })
}

/**
 * 取消点赞
 */
export const fabulousRemoveRequest = ({ id, type }) => {
  return Request({
    url: '/user/fabulous/disable',
    method: 'POST',
    data: {
      foreignId: id,
      type
    }
  })
}

/**
 * 收藏
 */
export const favoriteRequest = ({ id, type }) => {
  return Request({
    url: '/user/favorite',
    method: 'POST',
    data: {
      foreignId: id,
      type
    }
  })
}

/**
 * 取消收藏
 */
export const favoriteRemoveRequest = ({ id, type }) => {
  return Request({
    url: '/user/favorite/remove',
    method: 'POST',
    data: {
      foreignId: id,
      type
    }
  })
}
