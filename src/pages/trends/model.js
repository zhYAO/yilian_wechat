import * as trendsApi from './service'

export default {
  namespace: 'trends',
  state: {
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
        id: 0,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        title: '默默',
        intro: '的沙发斯蒂芬程序下次v',
        labels: ['图像视觉', '图像时间']
      },
      {
        id: 0,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        title: '默默',
        intro: '的沙发斯蒂芬程序下次v',
        labels: ['图像视觉', '图像时间']
      },
      {
        id: 0,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        title: '默默',
        intro: '的沙发斯蒂芬程序下次v',
        labels: ['图像视觉', '图像时间']
      },
      {
        id: 0,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        title: '默默',
        intro: '的沙发斯蒂芬程序下次v',
        labels: ['图像视觉', '图像时间']
      }
    ]
  },

  effects: {
    *effectsDemo(_, { call, put }) {
      const { status, data } = yield call(trendsApi.demo, {})
      if (status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            topData: data
          }
        })
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
