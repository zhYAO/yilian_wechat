import { favoriteListRequest } from '@service/user-controller'

export default {
  namespace: 'myFavorite',
  state: {
    current: 0,
    tabList: [{ title: '职位' }, { title: '动态' }, { title: '产品' }],
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
    dynamicList: [],
    positionList: [],
    productList: []
  },

  effects: {
    *effectsFavoriteList({ payload }, { call, put }) {
      const { data } = yield call(favoriteListRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            ...data
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
