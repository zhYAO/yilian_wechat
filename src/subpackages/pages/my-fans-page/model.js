import * as myFansPageApi from './service'
import { myFansRequest } from '@service/user-controller'

export default {
  namespace: 'myFansPage',
  state: {
    pageSize: 10,
    page: 0,
    hasNextPage: true,
    fansList: []
  },

  effects: {
    *effectsFansList({ payload }, { call, put, select }) {
      const { fansList, pageSize, page } = yield select(state => state.myFansPage)
      const { isReset } = payload
      const { data } = yield call(myFansRequest, {
        pageSize: payload.pageSize,
        page: isReset ? 0 : payload.page + 1 
      })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            fansList: isReset ? data : fansList.concat(data),
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
