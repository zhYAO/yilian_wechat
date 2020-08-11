import * as classDetailsApi from './service'

export default {
  namespace: 'classDetails',
  state: {
    classList: []
  },

  effects: {
    *effectsCompanyList({ payload }, { call, put }) {
      const { data } = yield call(classDetailsApi.companyList, { ...payload })
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
