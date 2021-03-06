import { favoriteListRequest } from '@service/user-controller'

export default {
  namespace: 'myFavorite',
  state: {
    current: 0,
    tabList: [{ title: '职位' }, { title: '动态' }, { title: '产品' }],
    dynamicList: [],
    positionList: [],
    productList: []
  },

  effects: {
    *effectsFavoriteList({ payload }, { call, put }) {
      const { data } = yield call(favoriteListRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            ...data
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
