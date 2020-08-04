import * as trendsApi from './service'

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
      const { data } = yield call(trendsApi.dynamicList, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            comentCardList: comentCardList.concat(data),
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
