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
