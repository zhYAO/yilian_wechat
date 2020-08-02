import Request from '../../../utils/request';

export const companyList = data => {
  return Request({
    url: '/company/label',
    method: 'GET',
    data
  })
}
