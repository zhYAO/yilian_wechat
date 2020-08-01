import Request from '../../../utils/request'

export const labelUserList = data => {
  return Request({
    url: '/label/user/list',
    method: 'GET',
    data
  })
}

export const changeSort = data => {
  return Request({
    url: '/label/user/change_sort',
    method: 'PUT',
    data
  })
}