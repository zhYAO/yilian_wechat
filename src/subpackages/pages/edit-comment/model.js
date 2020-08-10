import { dynamicDetailRequest, addCommentRequest } from '@service/info-controller'
import {
  fabulousRequest,
  fabulousRemoveRequest,
  attentionRequest,
  attentionRemoveRequest,
  favoriteRequest,
  favoriteRemoveRequest
} from '@service/user-controller'

export default {
  namespace: 'editComment',
  state: {
    detail: {},
    isOpened: false,
    replyName: '',
    replyId: 0,
    content: '',
    isShareOpened: false,
    actionSheetOpen: false,
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
    },
    *effectsAttention({ payload }, { call, put }) {
      const { data } = yield call(attentionRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {}
        })
      }
    },
    *effectsAttentionRemove({ payload }, { call, put }) {
      const { data } = yield call(attentionRemoveRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {}
        })
      }
    },
    *effectsfavorite({ payload }, { call, put }) {
      const { data } = yield call(favoriteRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {}
        })
      }
    },
    *effectsfavoriteRemove({ payload }, { call, put }) {
      const { data } = yield call(favoriteRemoveRequest, { ...payload })
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
