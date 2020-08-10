import * as productDetailApi from './service'
import { productDetailRequest } from '@service/company-controller'
import { addCommentRequest } from '@service/info-controller'
import {
  fabulousRequest,
  fabulousRemoveRequest,
  favoriteRequest,
  favoriteRemoveRequest
} from '@service/user-controller'

export default {
  namespace: 'productDetail',
  state: {
    detail: {},
    isOpened: false,
    replyName: '',
    replyId: 0,
    content: ''
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
