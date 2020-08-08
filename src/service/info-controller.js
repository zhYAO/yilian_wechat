import Request from '../utils/request'

/**
 * banner列表
 */
export const bannerListRequest = (data) => {
  return Request({
    url: '/banner',
    method: 'GET',
    data
  })
}

/**
 * 小易推荐
 */
export const companyRecommendRequest = (data) => {
  return Request({
    url: '/company/recommend',
    method: 'GET',
    data
  })
}
