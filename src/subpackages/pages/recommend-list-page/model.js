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
      const { companyCardList, pageSize, page } = yield select(state => state.company)
      const { data } = yield call(companyRecommendRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            companyCardList: companyCardList.concat(data),
            page: page + 1
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
