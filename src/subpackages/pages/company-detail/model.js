import * as companyDetailApi from './service'

export default {
  namespace: 'companyDetail',
  state: {
    keai: '测试数据666'
  },

  effects: {
    *effectsDemo(_, { call, put }) {
      const { status, data } = yield call(companyDetailApi.demo, {})
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
