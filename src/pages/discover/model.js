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
    actionSheetOpen: false,
    isShareOpened: false,
    hasNextPage: [true, true, true],
    pageSize: [10, 10, 10],
    page: [1, 1, 1]
  },

  effects: {
    *effectsPositionList({ payload }, { call, put, select }) {
      const { jobList, pageSize, page, hasNextPage } = yield select(state => state.discover)
      const { isReset } = payload
      const { data } = yield call(discoverApi.positionList, {
        pageSize: payload.pageSize,
        page: isReset ? 1 : payload.page + 1
      })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            jobList: isReset ? data.records : jobList.concat(data.records),
            page: [isReset ? 1 : page + 1, page[1], page[2]]
          }
        })
        if (data.records.length < pageSize[0]) {
          yield put({
            type: 'updateState',
            payload: {
              hasNextPage: [false, hasNextPage[1], hasNextPage[2]]
            }
          })
        }
      } else {
        yield put({
          type: 'updateState',
          payload: {
            hasNextPage: [false, hasNextPage[1], hasNextPage[2]]
          }
        })
      }
    },
    *effectsVideoList({ payload }, { call, put, select }) {
      const { videoList, pageSize, page, hasNextPage } = yield select(state => state.discover)
      const { isReset } = payload
      const { data } = yield call(discoverApi.videoList, {
        pageSize: payload.pageSize,
        page: isReset ? 1 : payload.page + 1
      })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            videoList: isReset ? data.records : videoList.concat(data.records),
            page: [page[0], isReset ? 1 : page + 1, page[2]]
          }
        })
        if (data.records.length < pageSize[1]) {
          yield put({
            type: 'updateState',
            payload: {
              hasNextPage: [hasNextPage[0], false, hasNextPage[2]]
            }
          })
        }
      } else {
        yield put({
          type: 'updateState',
          payload: {
            hasNextPage: [hasNextPage[0], false, hasNextPage[2]]
          }
        })
      }
    },
    *effectsActivityList({ payload }, { call, put, select }) {
      const { comentCardList, pageSize, page, hasNextPage } = yield select(state => state.discover)
      const { isReset } = payload
      const { data } = yield call(discoverApi.activityList, {
        pageSize: payload.pageSize,
        page: isReset ? 1 : payload.page + 1
      })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            comentCardList: isReset ? data.records : comentCardList.concat(data.records),
            page: [page[0], page[1], isReset ? 1 : page + 1]
          }
        })
        if (data.records.length < pageSize[2]) {
          yield put({
            type: 'updateState',
            payload: {
              hasNextPage: [hasNextPage[0], hasNextPage[1], false]
            }
          })
        }
      } else {
        yield put({
          type: 'updateState',
          payload: {
            hasNextPage: [hasNextPage[0], hasNextPage[1], false]
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
