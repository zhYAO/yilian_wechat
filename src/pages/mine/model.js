import * as mineApi from './service'

export default {
  namespace: 'mine',
  state: {
    pageTitle: 'eLink',
    userInfo: {
      score: 100,
      dynamicNum: 1,
      focusNum: 1,
      CollectionNum: 1,
      fansNum: 1,
    },
  },

  effects: {
    *effectsDemo(_, { call, put }) {
      const { status, data } = yield call(mineApi.demo, {})
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
