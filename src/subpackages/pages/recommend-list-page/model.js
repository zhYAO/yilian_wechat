import * as recommendListPageApi from './service'
import { companyRecommendRequest } from '@service/info-controller'

export default {
  namespace: 'recommendListPage',
  state: {
    pageSize: 10,
    page: 0,
    hasNextPage: true,
    companyCardList: []
  },

  effects: {
    *effectsRecommend({ payload }, { call, put, select }) {
      const { companyCardList, pageSize, page } = yield select(state => state.recommendListPage)
      const { isReset } = payload
      const { data } = yield call(companyRecommendRequest, {
        pageSize: payload.pageSize,
        page: isReset ? 0 : payload.page + 1 
      })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            companyCardList: isReset ? data.records : companyCardList.concat(data.records),
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
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
