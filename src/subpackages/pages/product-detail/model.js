import * as productDetailApi from './service'
import { productDetailRequest } from '@service/company-controller'

export default {
  namespace: 'productDetail',
  state: {
    detail: {}
  },

  effects: {
    *effectsDetail({ payload }, { call, put }) {
      const { data } = yield call(productDetailRequest, { ...payload })
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
