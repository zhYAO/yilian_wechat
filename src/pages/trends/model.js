import * as trendsApi from './service'
import {
  fabulousRequest,
  fabulousRemoveRequest,
  attentionRequest,
  attentionRemoveRequest,
  favoriteRequest,
  favoriteRemoveRequest
} from '@service/user-controller'

export default {
  namespace: 'trends',
  state: {
    pageSize: 10,
    page: 0,
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
        page: payload.page
      })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            comentCardList: isReset ? data : comentCardList.concat(data),
            page: isReset ? 0 : page + 1
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
