import * as publishDynamicApi from './service'
import { publishRequest } from '@service/user-controller'

export default {
  namespace: 'publishDynamic',
  state: {
    value: ''
  },

  effects: {
    *effectsPublish({ payload }, { call, put }) {
      const { data } = yield call(publishRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
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
