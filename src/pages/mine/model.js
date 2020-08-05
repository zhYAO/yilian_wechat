import * as mineApi from './service'

export default {
  namespace: 'mine',
  state: {
    pageTitle: 'eLink',
    userInfo: {}
  },

  effects: {
    *effectsUserInfo({ payload }, { call, put, select }) {
      const { data } = yield call(mineApi.userHomepage, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            userInfo: data
          }
        })
      }
    },
    *effectsUserModify({ payload }, { call, put, select }) {
      const { data } = yield call(mineApi.userModify, { ...payload })
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
