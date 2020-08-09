import * as companyDetailApi from './service'
import { fabulousRequest, fabulousRemoveRequest } from '@service/user-controller'

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
    actionSheetOpen: false,
    isShareOpened: false
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
    },
    *effectsfabulous({ payload }, { call, put }) {
      const { data } = yield call(fabulousRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {}
        })
      }
    },
    *effectsfabulousRemove({ payload }, { call, put }) {
      const { data } = yield call(fabulousRemoveRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {}
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
