import Request from '../../utils/request';

export const companyList = (data) => {
  return Request({
    url: '/company/list',
    method: 'GET',
    data,
  });
};

// export const companyList = (data) => {
//   return Request({
//     url: '路径',
//     method: 'POST',
//     data,
//   });
// };
