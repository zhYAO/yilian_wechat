import Request from '../utils/request'

/**
 * 职位详情
 */
export const positionDetailRequest = ({ id }) => {
  return Request({
    url: `/company-position/detail/${id}`,
    method: 'GET',
    data: {}
  })
}

/**
 * 行业标签列表
 */
export const labelListRequest = ({ id }) => {
  return Request({
    url: `/label/list`,
    method: 'GET',
    data: {}
  })
}

/**
 * 产品详情
 */
export const productDetailRequest = ({ id }) => {
  return Request({
    url: `/company-product/detail/${id}`,
    method: 'GET',
    data: {}
  })
}

/**
 * 获取公司列表
 */
export const companyListRequest = data => {
  return Request({
    url: `/company/list`,
    method: 'GET',
    data
  })
}

/**
 * 职位申请
 */
export const companyApplyRequest = data => {
  return Request({
    url: `/company-position/apply`,
    method: 'POST',
    data
  })
}
