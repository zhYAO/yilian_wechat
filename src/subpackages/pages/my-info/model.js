import * as myInfoApi from './service'

export default {
  namespace: 'myInfo',
  state: {
    keai: '测试数据666'
  },

  effects: {
    *effectsDemo(_, { call, put }) {
      const { status, data } = yield call(my - infoApi.demo, {})
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