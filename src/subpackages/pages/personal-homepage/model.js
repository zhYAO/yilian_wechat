import * as personalHomepageApi from './service'
import {
  attentionRequest,
  attentionRemoveRequest,
  fabulousRequest,
  fabulousRemoveRequest
} from '@service/user-controller'

export default {
  namespace: 'personalHomepage',
  state: {
    userInfo: {
      avatarUrl: '',
      nickName: ''
    },
    dynamics: [],
    labels: [],
    companyName: '',
    name: '',
    theme: '',
    isAttention: false,
    actionSheetOpen: false,
    isShareOpened: false
  },

  effects: {
    *effectsGetInfo({ payload }, { call, put }) {
      const { data } = yield call(personalHomepageApi.getOtherInfo, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            ...data
          }
        })
      }
    },
    *effectsAttention({ payload }, { call, put }) {
      const { code } = yield call(attentionRequest, { ...payload })
      if (code === '0000') {
        yield put({
          type: 'updateState',
          payload: {
            isAttention: true
          }
        })
      }
    },
    *effectsAttentionRemove({ payload }, { call, put }) {
      const { code } = yield call(attentionRemoveRequest, { ...payload })
      if (code === '0000') {
        yield put({
          type: 'updateState',
          payload: {
            isAttention: false
          }
        })
      }
    },
    *effectsfabulous({ payload }, { call, put }) {
      const { data } = yield call(fabulousRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {}
        })
      }
    },
    *effectsfabulousRemove({ payload }, { call, put }) {
      const { data } = yield call(fabulousRemoveRequest, { ...payload })
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
