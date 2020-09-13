import * as mineApi from './service'

export default {
  namespace: 'mine',
  state: {
    pageTitle: 'Enstar',
    userInfo: {}
  },

  effects: {
    *effectsUserInfo({ payload }, { call, put, select }) {
      const { data } = yield call(mineApi.userHomepage, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            userInfo: { ...data }
          }
        })
      }
    },
    *effectsUserModify({ payload }, { call, put, select }) {
      const { code } = yield call(mineApi.userModify, { ...payload })
      if (code === '0000') {
        yield put({
          type: 'effectsUserInfo',
          payload: {}
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
