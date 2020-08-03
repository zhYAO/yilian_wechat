import * as mineApi from './service'

export default {
  namespace: 'mine',
  state: {
    pageTitle: 'eLink',
    userInfo: {
      id: 857,
      name: '天宇.陈',
      theme: 'e14pkz',
      sex: 0,
      weChat: 'v49cqe',
      mobile: '18091214382',
      email: '乐驹.姜@yahoo.com',
      companyId: 1,
      companyName: '天宇.陈',
      job: 'b21i68',
      labels: [
        {
          id: 654,
          createTime: '2020-07-27 22:31:24',
          createUser: 'sbabz5',
          updateTime: '2020-07-27 22:31:24',
          updateUser: 'meei13',
          imgPath: 'r9zozt',
          label: 'h0s04h',
          sortNo: 578,
          type: 896
        }
      ],
      dynamicCount: 28,
      attentionCount: 77,
      favoriteCount: 884,
      fansCount: 872,
      integral: 93
    }
  },

  effects: {
    *effectsLabelList({ payload }, { call, put, select }) {
      const { data } = yield call(mineApi.userHomepage, { ...payload })
      console.log(data, 'datadatadata')
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            userInfo: data
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
