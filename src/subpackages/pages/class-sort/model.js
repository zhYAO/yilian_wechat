import * as classSortApi from './service'

export default {
  namespace: 'classSort',
  state: {
    classList: []
  },

  effects: {
    *effectsLabelList({ payload }, { call, put, select }) {
      const { userId } = yield select(state => state.common.userInfo)
      const { data } = yield call(classSortApi.labelUserList, { ...payload, userId })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            classList: data
          }
        })
      }
    },
    *effectsChangeSort({ payload }, { call, put, select }) {
      const { userId } = yield select(state => state.common.userInfo)
      const { data } = yield call(classSortApi.changeSort, { ...payload, userId })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            classList: data
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
