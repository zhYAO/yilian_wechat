import * as searchpageApi from './service'

export default {
  namespace: 'searchPage',
  state: {
    searchVal: '',
    searchRecord: ['搜索词1', '搜索词1', '搜索词1', '搜索词1', '搜索词1'],
    hotRecord: ['搜索词1', '搜索词1', '搜索词1']
  },

  effects: {
    *effectsDemo(_, { call, put }) {
      const { status, data } = yield call(search - pageApi.demo, {})
      if (status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            topData: data
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
