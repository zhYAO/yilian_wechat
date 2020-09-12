import * as productDetailApi from './service'
import { productDetailRequest } from '@service/company-controller'
import { addCommentRequest } from '@service/info-controller'
import {
  fabulousRequest,
  fabulousRemoveRequest,
  favoriteRequest,
  favoriteRemoveRequest
} from '@service/user-controller'
import { showToast } from '@crossplatform/apiservice/toast'

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
      const { code } = yield call(fabulousRequest, { ...payload })
      if (code === '0000') {
        showToast({
          title: '点赞成功'
        })
      }
    },
    *effectsfabulousRemove({ payload }, { call, put }) {
      const { code } = yield call(fabulousRemoveRequest, { ...payload })
      if (code === '0000') {
        showToast({
          title: '取消点赞'
        })
      }
    },
    *effectsfavorite({ payload }, { call, put }) {
      const { code } = yield call(favoriteRequest, { ...payload })
      if (code === '0000') {
        showToast({
          title: '收藏成功'
        })
      }
    },
    *effectsfavoriteRemove({ payload }, { call, put }) {
      const { code } = yield call(favoriteRemoveRequest, { ...payload })
      if (code === '0000') {
        showToast({
          title: '取消收藏'
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
