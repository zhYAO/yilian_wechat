import * as indexApi from './service'
import { bannerListRequest, companyRecommendRequest } from '@service/info-controller'

export default {
  namespace: 'home',
  state: {
    bannerList: [],
    companyCardList: [],
    recommendCardList: []
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
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
