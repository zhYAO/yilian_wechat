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
