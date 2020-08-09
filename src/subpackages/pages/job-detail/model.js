import * as jobDetailApi from './service'
import { positionDetailRequest } from '@service/company-controller'

export default {
  namespace: 'jobDetail',
  state: {
    detail: {}
  },

  effects: {
    *effectsPositionDetail({ payload }, { call, put }) {
      const { data } = yield call(positionDetailRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            detail: data
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
