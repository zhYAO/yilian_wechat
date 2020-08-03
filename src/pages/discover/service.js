import Request from '../../utils/request';

export const positionList = (data) => {
  return Request({
    url: '/found/position',
    method: 'GET',
    data,
  });
};

export const videoList = (data) => {
  return Request({
    url: '/found/video',
    method: 'GET',
    data,
  });
};
