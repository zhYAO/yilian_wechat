import Request from '../../../utils/request';

export const getOtherInfo = (data) => {
  return Request({
    url: `/user/other-page/${data.id}`,
    method: 'GET',
    data,
  });
};
