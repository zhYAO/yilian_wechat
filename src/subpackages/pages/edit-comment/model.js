import * as editCommentApi from './service'
import { dynamicDetailRequest, addCommentRequest } from '@service/info-controller'

export default {
  namespace: 'editComment',
  state: {
    detail: {},
    isOpened: false,
    replyName: '',
    replyId: 0
  },

  effects: {
    *effectsDetail({ payload }, { call, put }) {
      const { data } = yield call(dynamicDetailRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            detail: data
          }
        })
      }
    },
    *effectsAddComment({ payload }, { call, put }) {
      const { data } = yield call(addCommentRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            isOpened: false
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
