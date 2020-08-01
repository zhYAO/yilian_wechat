import Request from '../../utils/request';

export const userHomepage = (data) => {
  return Request({
    url: '/user/homepage',
    method: 'GET',
    data,
  });
};
