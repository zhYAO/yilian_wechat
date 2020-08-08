import * as jobDetailApi from './service'
import { positionDetailRequest } from '@service/company-controller'

export default {
  namespace: 'jobDetail',
  state: {
    keai: '测试数据666'
  },

  effects: {
    *effectsPositionDetail({ payload }, { call, put }) {
      const { status, data } = yield call(positionDetailRequest, { ...payload })
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
