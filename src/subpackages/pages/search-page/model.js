import * as searchpageApi from './service'

export default {
  namespace: 'searchPage',
  state: {
    current: 0,
    tabList: [{ title: '公司' }, { title: '产品' }, { title: '动态' }],
    searchVal: '',
    searchRecord: ['搜索词1', '搜索词1', '搜索词1', '搜索词1', '搜索词1'],
    hotRecord: ['搜索词1', '搜索词1', '搜索词1'],
    searchData: {},
    isSearch: false
  },

  effects: {
    *effectsSearch({ payload }, { call, put, select }) {
      const { searchVal } = yield select(state => state.searchPage)
      const { data } = yield call(searchpageApi.search, { name: searchVal })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            searchVal: '',
            searchData: data,
            isSearch: true
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
