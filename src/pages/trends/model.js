import * as trendsApi from './service'
import {
  fabulousRequest,
  fabulousRemoveRequest,
  attentionRequest,
  attentionRemoveRequest,
  favoriteRequest,
  favoriteRemoveRequest
} from '@service/user-controller'
import { recommendAttentionRequest } from '@service/info-controller'
import { showToast } from '@crossplatform/apiservice/toast'

export default {
  namespace: 'trends',
  state: {
    pageSize: 10,
    page: 1,
    hasNextPage: true,
    focusCardsList: [],
    comentCardList: [],
    actionSheetOpen: false,
    isShareOpened: false
  },

  effects: {
    *effectsDynamicList({ payload }, { call, put, select }) {
      const { comentCardList, pageSize, page } = yield select(state => state.trends)
      const { isReset } = payload
      const { data } = yield call(trendsApi.dynamicList, {
        pageSize: payload.pageSize,
        page: isReset ? 1 : payload.page + 1
      })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            comentCardList: isReset ? data : comentCardList.concat(data),
            page: isReset ? 1 : page + 1
          }
        })
        if (data.length < pageSize) {
          yield put({
            type: 'updateState',
            payload: {
              hasNextPage: false
            }
          })
        }
      } else {
        yield put({
          type: 'updateState',
          payload: {
            hasNextPage: false
          }
        })
      }
    },
    *effectsRecommendAttention({ payload }, { call, put }) {
      const { data } = yield call(recommendAttentionRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            focusCardsList: data.records
          }
        })
      }
    },
    *effectsfabulous({ payload }, { call, put }) {
      const { code } = yield call(fabulousRequest, { ...payload })
      if (code === '0000') {
        yield put({
          type: 'updateState',
          payload: {}
        })
        showToast({
          title: '点赞成功'
        })
      }
    },
    *effectsfabulousRemove({ payload }, { call, put }) {
      const { code } = yield call(fabulousRemoveRequest, { ...payload })
      if (code === '0000') {
        yield put({
          type: 'updateState',
          payload: {}
        })
        showToast({
          title: '取消点赞'
        })
      }
    },
    *effectsAttention({ payload }, { call, put }) {
      const { code } = yield call(attentionRequest, { ...payload })
      if (code === '0000') {
        yield put({
          type: 'updateState',
          payload: {}
        })
        showToast({
          title: '关注成功'
        })
      }
    },
    *effectsAttentionRemove({ payload }, { call, put }) {
      const { code } = yield call(attentionRemoveRequest, { ...payload })
      if (code === '0000') {
        yield put({
          type: 'updateState',
          payload: {}
        })
        showToast({
          title: '取消关注'
        })
      }
    },
    *effectsfavorite({ payload }, { call, put }) {
      const { code } = yield call(favoriteRequest, { ...payload })
      if (code === '0000') {
        yield put({
          type: 'updateState',
          payload: {}
        })
        showToast({
          title: '收藏成功'
        })
      }
    },
    *effectsfavoriteRemove({ payload }, { call, put }) {
      const { code } = yield call(favoriteRemoveRequest, { ...payload })
      if (code === '0000') {
        yield put({
          type: 'updateState',
          payload: {}
        })
        showToast({
          title: '取消收藏'
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
