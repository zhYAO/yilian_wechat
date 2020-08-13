import * as indexApi from './service'
import { bannerListRequest, companyRecommendRequest, hotRequest } from '@service/info-controller'

export default {
  namespace: 'home',
  state: {
    pageSize: 10,
    page: 1,
    hasNextPage: true,
    bannerList: [],
    companyCardList: [],
    recommendCardList: [],
    hotList: []
  },

  effects: {
    *effectsBannerList({ payload }, { call, put }) {
      const { data } = yield call(bannerListRequest, { ...payload, type: 1 })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            bannerList: data.records || []
          }
        })
      }
    },
    *effectsRecommend({ payload }, { call, put, select }) {
      const { companyCardList } = yield select(state => state.home)
      const { data } = yield call(companyRecommendRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            companyCardList: companyCardList.concat(data.records || [])
          }
        })
      }
    },
    *effectsHot({ payload }, { call, put, select }) {
      const { hotList, pageSize, page } = yield select(state => state.home)
      const { data } = yield call(hotRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            hotList: hotList.concat(data.records),
            page: page + 1
          }
        })
        if (data.records.length < pageSize) {
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
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
