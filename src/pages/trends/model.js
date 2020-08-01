import * as trendsApi from './service'

export default {
  namespace: 'trends',
  state: {
    pageSize: 10,
    page: 0,
    hasNextPage: true,
    focusCardsList: [
      {
        id: 0,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        title: '默默',
        intro: '的沙发斯蒂芬程序下次v',
        labels: ['图像视觉', '图像时间']
      },
      {
        id: 1,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        title: '默默',
        intro: '的沙发斯蒂芬程序下次v',
        labels: ['图像视觉', '图像时间']
      },
      {
        id: 2,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        title: '默默',
        intro: '的沙发斯蒂芬程序下次v',
        labels: ['图像视觉', '图像时间']
      },
      {
        id: 3,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        title: '默默',
        intro: '的沙发斯蒂芬程序下次v',
        labels: ['图像视觉', '图像时间']
      },
      {
        id: 4,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        title: '默默',
        intro: '的沙发斯蒂芬程序下次v',
        labels: ['图像视觉', '图像时间']
      }
    ],
    comentCardList: []
  },

  effects: {
    *effectsDynamicList({ payload }, { call, put, select }) {
      const { comentCardList, pageSize, page } = yield select(state => state.trends)
      const { data } = yield call(trendsApi.dynamicList, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            comentCardList: comentCardList.concat(data),
            page: page + 1
          }
        })
        if (data.length < pageSize) {
          yield put({
            type: 'updateState',
            payload: {
              hasNextPage: false
            }
          })
        }
      } else {
        yield put({
          type: 'updateState',
          payload: {
            hasNextPage: false
          }
        })
      }
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
