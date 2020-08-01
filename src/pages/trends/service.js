import Request from '../../utils/request';

export const dynamicList = (data) => {
  return Request({
    url: '/dynamic/list',
    method: 'GET',
    data,
  });
};
