import * as searchpageApi from './service'
import {
  fabulousRequest,
  fabulousRemoveRequest,
  attentionRequest,
  attentionRemoveRequest,
  favoriteRequest,
  favoriteRemoveRequest
} from '@service/user-controller'
import { showToast } from '@crossplatform/apiservice/toast'
import { setStorageSync } from '@crossplatform/apiservice/storage'

export default {
  namespace: 'searchPage',
  state: {
    current: 0,
    tabList: [{ title: '公司' }, { title: '产品' }, { title: '动态' }, { title: '职位' }],
    searchVal: '',
    searchRecord: [],
    hotRecord: ['搜索词1', '搜索词1', '搜索词1'],
    searchData: {},
    isSearch: false,
    actionSheetOpen: false,
    isShareOpened: false
  },

  effects: {
    *effectsSearch({ payload }, { call, put, select }) {
      const { searchVal, searchRecord = [] } = yield select(state => state.searchPage)
      const { data } = yield call(searchpageApi.search, { name: searchVal })
      if (data) {
        let newArr = [...searchRecord]
        newArr.push(searchVal.trim())
        const history = new Set(newArr)
        setStorageSync('searchHistory', [...history].join('|'))
        yield put({
          type: 'updateState',
          payload: {
            searchData: data,
            isSearch: true,
            searchRecord: [...history]
          }
        })
      }
    },
    *effectsfabulous({ payload }, { call, put }) {
      const { code } = yield call(fabulousRequest, { ...payload })
      if (code === '0000') {
        yield put({
          type: 'updateState',
          payload: {}
        })
        showToast({
          title: '点赞成功'
        })
      }
    },
    *effectsfabulousRemove({ payload }, { call, put }) {
      const { code } = yield call(fabulousRemoveRequest, { ...payload })
      if (code === '0000') {
        yield put({
          type: 'updateState',
          payload: {}
        })
        showToast({
          title: '取消点赞'
        })
      }
    },
    *effectsAttention({ payload }, { call, put }) {
      const { code } = yield call(attentionRequest, { ...payload })
      if (code === '0000') {
        yield put({
          type: 'updateState',
          payload: {}
        })
        showToast({
          title: '关注成功'
        })
      }
    },
    *effectsAttentionRemove({ payload }, { call, put }) {
      const { code } = yield call(attentionRemoveRequest, { ...payload })
      if (code === '0000') {
        yield put({
          type: 'updateState',
          payload: {}
        })
        showToast({
          title: '取消关注'
        })
      }
    },
    *effectsfavorite({ payload }, { call, put }) {
      const { code } = yield call(favoriteRequest, { ...payload })
      if (code === '0000') {
        yield put({
          type: 'updateState',
          payload: {}
        })
        showToast({
          title: '收藏成功'
        })
      }
    },
    *effectsfavoriteRemove({ payload }, { call, put }) {
      const { code } = yield call(favoriteRemoveRequest, { ...payload })
      if (code === '0000') {
        yield put({
          type: 'updateState',
          payload: {}
        })
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
