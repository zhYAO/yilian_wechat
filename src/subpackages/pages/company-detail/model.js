import * as companyDetailApi from './service'

export default {
  namespace: 'companyDetail',
  state: {
    current: 0,
    tabList: [{ title: '详情' }, { title: '产品' }, { title: '职位' }, { title: '动态' }],
    companyDetail: {},
    customerList: [],
    dynamicList: [],
    positionList: [],
    productList: [],
  },

  effects: {
    *effectsDetail({ payload }, { call, put }) {
      const { status, data } = yield call(companyDetailApi.detail, { ...payload })
      if (data) {
        const { companyDetail, customerList, dynamicList, positionList, productList } = data
        yield put({
          type: 'updateState',
          payload: {
            companyDetail,
            customerList,
            dynamicList,
            positionList,
            productList
          }
        })
      } else {
      }
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
