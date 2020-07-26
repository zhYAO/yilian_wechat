import * as classDetailsApi from './service'

export default {
  namespace: 'classDetails',
  state: {
    jobList: [
      {
        id: 0,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        jobTitle: '产品经理',
        place: '算法部',
        area: '杭州宝信科技有限公司',
        city: '上海',
        time: '刚刚发布'
      },
      {
        id: 1,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        jobTitle: '产品经理',
        place: '算法部',
        area: '杭州宝信科技有限公司',
        city: '上海',
        time: '刚刚发布'
      },
      {
        id: 2,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        jobTitle: '产品经理',
        place: '算法部',
        area: '杭州宝信科技有限公司',
        city: '上海',
        time: '刚刚发布'
      }
    ]
  },

  effects: {
    *effectsDemo(_, { call, put }) {
      const { status, data } = yield call(classDetailsApi.demo, {})
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
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
