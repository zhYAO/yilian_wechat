import * as industryLabelApi from './service'
import { labelListRequest } from '@service/company-controller'
import { modifyLabelRequest } from '@service/user-controller'

export default {
  namespace: 'industryLabel',
  state: {
    chosedLabels: [],
    industryLabels: []
  },

  effects: {
    *effectsLabelList(_, { call, put }) {
      const { data } = yield call(labelListRequest, {})
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            industryLabels: data.records || []
          }
        })
      }
    },
    *effectsModifyLabel({ payload }, { call, put }) {
      const { data } = yield call(modifyLabelRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            chosedLabels: data
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
