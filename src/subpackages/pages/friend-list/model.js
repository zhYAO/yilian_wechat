import { recommendAttentionRequest } from '@service/info-controller'

export default {
  namespace: 'friendList',
  state: {
    focusCardsList: [],
    pageSize: 10,
    page: 1,
    hasNextPage: true,
  },

  effects: {
    *effectsRecommendList({ payload }, { call, put, select }) {
      const { focusCardsList, pageSize, page } = yield select(state => state.friendList)
      const { isReset } = payload
      const { data } = yield call(recommendAttentionRequest, {
        pageSize: payload.pageSize,
        page: isReset ? 1 : payload.page + 1 
      })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            focusCardsList: isReset ? data.records : focusCardsList.concat(data.records),
            page: isReset ? 1 : page + 1
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
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
