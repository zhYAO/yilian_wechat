import * as jobDetailApi from './service'
import { positionDetailRequest } from '@service/company-controller'
import {
  fabulousRequest,
  fabulousRemoveRequest,
  favoriteRequest,
  favoriteRemoveRequest
} from '@service/user-controller'

export default {
  namespace: 'jobDetail',
  state: {
    detail: {}
  },

  effects: {
    *effectsPositionDetail({ payload }, { call, put }) {
      const { data } = yield call(positionDetailRequest, { ...payload })
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
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
