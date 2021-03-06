import Request from '../utils/request'

/**
 * banner列表
 */
export const bannerListRequest = data => {
  return Request({
    url: '/banner',
    method: 'GET',
    data
  })
}

/**
 * 星推荐
 */
export const companyRecommendRequest = data => {
  return Request({
    url: '/company/recommend',
    method: 'GET',
    data
  })
}

/**
 * 本月热门
 */
export const hotRequest = data => {
  return Request({
    url: '/company-product/hot/month',
    method: 'GET',
    data
  })
}

/**
 * 动态详情
 */
export const dynamicDetailRequest = ({ id }) => {
  return Request({
    url: `/dynamic/detail/${id}`,
    method: 'GET'
  })
}

/**
 * 添加评论
 */
export const addCommentRequest = data => {
  return Request({
    url: '/comment/add',
    method: 'POST',
    data
  })
}

/**
 * 视频详情
 */
export const videoDetailRequest = ({ id }) => {
  return Request({
    url: `/company-video/detail/${id}`,
    method: 'GET'
  })
}

/**
 * 推荐关注
 */
export const recommendAttentionRequest = data => {
  return Request({
    url: '/user/recommend',
    method: 'GET',
    data
  })
}

/**
 * 解码手机号数据
 */
export const encryptedPhoneRequest = data => {
  return Request({
    url: '/wx-mini-data/encrypted',
    method: 'GET',
    data
  })
}

/**
 * 分享计数
 */
export const shareTimesRequest = data => {
  return Request({
    url: '/user/forward-count',
    method: 'POST',
    data
  })
}
