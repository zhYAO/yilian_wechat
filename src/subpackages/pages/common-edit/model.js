import * as commonEditApi from './service'
import { modifyUserInfoRequest, modifyPasswordRequest } from '@service/user-controller'
import { showToast } from '@crossplatform/apiservice/toast'

export default {
  namespace: 'commonEdit',
  state: {},

  effects: {
    *effectsUpdate({ payload }, { call, put }) {
      const { status, data } = yield call(modifyUserInfoRequest, { ...payload })
      showToast({
        title: '修改成功'
      })
    },
    *effectsPasswordUpdate({ payload }, { call, put }) {
      const { status, data } = yield call(modifyPasswordRequest, { ...payload })
      showToast({
        title: '修改成功'
      })
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
