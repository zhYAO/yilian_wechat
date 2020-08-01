import Request from '../../../utils/request';

export const detail = (data) => {
  return Request({
    url: `/company/detail/${data.id}`,
    method: 'GET',
    data,
  });
};
