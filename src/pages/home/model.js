import * as indexApi from './service'

export default {
  namespace: 'home',
  state: {
    searchData: ''
  },

  effects: {
    *effectsDemo(_, { call, put }) {
      const { status, data } = yield call(indexApi.demo, {})
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
