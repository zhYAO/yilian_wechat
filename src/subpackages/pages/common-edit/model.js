import * as commonEditApi from './service'
import { modifyUserInfoRequest } from '@service/user-controller'

export default {
  namespace: 'commonEdit',
  state: {},

  effects: {
    *effectsUpdate({ payload }, { call, put }) {
      const { status, data } = yield call(modifyUserInfoRequest, { ...payload })
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
