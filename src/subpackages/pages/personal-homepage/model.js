import * as personalHomepageApi from './service'
import {
  attentionRequest,
  attentionRemoveRequest,
  fabulousRequest,
  fabulousRemoveRequest,
  favoriteRequest,
  favoriteRemoveRequest
} from '@service/user-controller'
import { showToast } from '@crossplatform/apiservice/toast'

export default {
  namespace: 'personalHomepage',
  state: {
    userInfo: {
      avatarUrl: '',
      nickName: ''
    },
    dynamics: [],
    labels: [],
    companyName: '',
    name: '',
    theme: '',
    imgPath: '',
    isAttention: false,
    actionSheetOpen: false,
    isShareOpened: false
  },

  effects: {
    *effectsGetInfo({ payload }, { call, put }) {
      const { data } = yield call(personalHomepageApi.getOtherInfo, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            ...data
          }
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
