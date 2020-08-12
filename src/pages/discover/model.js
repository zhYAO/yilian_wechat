import * as discoverApi from './service'
import {
  fabulousRequest,
  fabulousRemoveRequest,
  attentionRequest,
  attentionRemoveRequest,
  favoriteRequest,
  favoriteRemoveRequest
} from '@service/user-controller'
import { showToast } from '@crossplatform/apiservice/toast'

export default {
  namespace: 'discover',
  state: {
    current: 0,
    tabList: [{ title: '职位' }, { title: '视频' }, { title: '活动' }],
    bannerList: [
      {
        id: 1,
        picUrl:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        url: 'www.baidu.com'
      }
    ],
    jobList: [],
    videoList: [],
    comentCardList: [],
    actionSheetOpen: false
  },

  effects: {
    *effectsPositionList({ payload }, { call, put, select }) {
      const { jobList } = yield select(state => state.discover)
      const { data } = yield call(discoverApi.positionList, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            jobList: data
          }
        })
      }
    },
    *effectsVideoList({ payload }, { call, put, select }) {
      const { videoList } = yield select(state => state.discover)
      const { data } = yield call(discoverApi.videoList, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            videoList: data
          }
        })
      }
    },
    *effectsActivityList({ payload }, { call, put, select }) {
      const { comentCardList } = yield select(state => state.discover)
      const { data } = yield call(discoverApi.activityList, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            comentCardList: data
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
