import * as companyDetailApi from './service'
import {
  fabulousRequest,
  fabulousRemoveRequest,
  attentionRequest,
  attentionRemoveRequest,
  favoriteRequest,
  favoriteRemoveRequest
} from '@service/user-controller'

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
      const { data } = yield call(companyDetailApi.detail, { ...payload })
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
    },
    *effectsAttention({ payload }, { call, put }) {
      const { data } = yield call(attentionRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {}
        })
      }
    },
    *effectsAttentionRemove({ payload }, { call, put }) {
      const { data } = yield call(attentionRemoveRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {}
        })
      }
    },
    *effectsfavorite({ payload }, { call, put }) {
      const { data } = yield call(favoriteRequest, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {}
        })
      }
    },
    *effectsfavoriteRemove({ payload }, { call, put }) {
      const { data } = yield call(favoriteRemoveRequest, { ...payload })
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
