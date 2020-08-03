import * as searchpageApi from './service'

export default {
  namespace: 'searchPage',
  state: {
    searchVal: '',
    searchRecord: ['搜索词1', '搜索词1', '搜索词1', '搜索词1', '搜索词1'],
    hotRecord: ['搜索词1', '搜索词1', '搜索词1']
  },

  effects: {
    *effectsSearch({ payload }, { call, put, select }) {
      const { searchVal } = yield select(state => state.searchPage)
      const { data } = yield call(searchpageApi.search, { name: searchVal })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            searchVal: ''
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
