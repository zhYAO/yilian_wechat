import * as mineApi from './service'

export default {
  namespace: 'mine',
  state: {
    pageTitle: 'eLink',
    userInfo: {}
  },

  effects: {
    *effectsLabelList({ payload }, { call, put, select }) {
      const { data } = yield call(mineApi.userHomepage, { ...payload })
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
