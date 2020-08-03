import * as discoverApi from './service'

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
    comentCardList: []
  },

  effects: {
    *effectsPositionList({ payload }, { call, put, select }) {
      const { jobList } = yield select(state => state.discover)
      const { data } = yield call(discoverApi.positionList, { ...payload })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            jobList: jobList.concat(data)
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
            videoList: videoList.concat(data)
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
            comentCardList: comentCardList.concat(data)
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
