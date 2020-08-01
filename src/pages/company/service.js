import Request from '../../utils/request'

export const companyList = data => {
  return Request({
    url: '/company/label',
    method: 'GET',
    data
  })
}

export const labelUserList = data => {
  return Request({
    url: '/label/user/list',
    method: 'GET',
    data
  })
}
