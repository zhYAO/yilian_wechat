import * as myInfoApi from './service'
import { modifyUserInfoRequest, userInfoRequest } from '@service/user-controller'
import { encryptedPhoneRequest } from '@service/info-controller'

export default {
  namespace: 'myInfo',
  state: {
    userInfo: {}
  },

  effects: {
    *effectsModify({ payload }, { call, put }) {
      const { data } = yield call(modifyUserInfoRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            detail: data
          }
        })
      }
    },
    *effectsUserInfo({ payload }, { call, put, select }) {
      const { data } = yield call(userInfoRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            userInfo: data
          }
        })
      }
    },
    *effectsEncryptedPhone({ payload }, { call, put, select }) {
      const { data } = yield call(encryptedPhoneRequest, { ...payload })
      if (data) {
        yield put({
          type: 'effectsModify',
          payload: {
            mobile: data.phoneNumber
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
