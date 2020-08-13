import * as myInfoApi from './service'
import { modifyUserInfoRequest, userInfoRequest } from '@service/user-controller'

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
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
