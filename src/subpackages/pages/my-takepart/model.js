import { myTakepartRequest } from '@service/user-controller'

export default {
  namespace: 'myTakepart',
  state: {
    current: 0,
    tabList: [{ title: '公司' }, { title: '产品' }, { title: '动态' }],
    dynamicList: [],
    companys: [],
    productList: []
  },

  effects: {
    *effectsTakePart({ payload }, { call, put }) {
      const { data } = yield call(myTakepartRequest, { ...payload })
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
