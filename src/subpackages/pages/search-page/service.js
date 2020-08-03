import Request from '../../../utils/request';

export const search = (data) => {
  return Request({
    url: '/search/',
    method: 'GET',
    data,
  });
};
