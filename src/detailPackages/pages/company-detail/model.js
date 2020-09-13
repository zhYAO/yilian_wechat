import * as companyDetailApi from './service'
import {
  fabulousRequest,
  fabulousRemoveRequest,
  attentionRequest,
  attentionRemoveRequest,
  favoriteRequest,
  favoriteRemoveRequest
} from '@service/user-controller'
import { dynamicListRequest } from '@service/company-controller'
import { showToast } from '@crossplatform/apiservice/toast'

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
      const {
        data: { records: dynamicList }
      } = yield call(dynamicListRequest, {
        type: 'COMPANY',
        foreignId: payload.id
      })
      if (data) {
        const { companyDetail, customerList, positionList, productList } = data
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
      const { code } = yield call(fabulousRequest, { ...payload })
      if (code === '0000') {
        showToast({
          title: '点赞成功'
        })
      }
    },
    *effectsfabulousRemove({ payload }, { call, put }) {
      const { code } = yield call(fabulousRemoveRequest, { ...payload })
      if (code === '0000') {
        showToast({
          title: '取消点赞'
        })
      }
    },
    *effectsAttention({ payload }, { call, put }) {
      const { code } = yield call(attentionRequest, { ...payload })
      if (code === '0000') {
        showToast({
          title: '关注成功'
        })
      }
    },
    *effectsAttentionRemove({ payload }, { call, put }) {
      const { code } = yield call(attentionRemoveRequest, { ...payload })
      if (code === '0000') {
        showToast({
          title: '取消关注'
        })
      }
    },
    *effectsfavorite({ payload }, { call, put }) {
      const { code } = yield call(favoriteRequest, { ...payload })
      if (code === '0000') {
        showToast({
          title: '收藏成功'
        })
      }
    },
    *effectsfavoriteRemove({ payload }, { call, put }) {
      const { code } = yield call(favoriteRemoveRequest, { ...payload })
      if (code === '0000') {
        showToast({
          title: '取消收藏'
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
