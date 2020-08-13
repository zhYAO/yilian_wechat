import * as aboutUsApi from './service'

export default {
  namespace: 'aboutUs',
  state: {
    keai: '测试数据666'
  },

  effects: {
    *effectsDemo(_, { call, put }) {
      const { status, data } = yield call(aboutUsApi.demo, {})
      if (status === 'ok') {
        yield put({
          type: 'updateState',
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
