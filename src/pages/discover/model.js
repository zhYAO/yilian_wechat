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
    comentCardList: [
      {
        id: 0,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        name: '默默',
        date: '2020-06-13',
        intro:
          '快仓公司成立于2014年，专注于提供智能仓储解决方案，公司以“成为智能仓储最佳践行者”为己任，不仅集仓储机器人的研发、生产、销售、项目实施、管理、服务为一体，更注重于在智能仓储系统这个国内空白的领域进行深入研究及实际运行。',
        shareNum: 100,
        commentNum: 100,
        zanNum: 100
      },
      {
        id: 1,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        name: '默默',
        date: '2020-06-13',
        intro:
          '快仓公司成立于2014年，专注于提供智能仓储解决方案，公司以“成为智能仓储最佳践行者”为己任，不仅集仓储机器人的研发、生产、销售、项目实施、管理、服务为一体，更注重于在智能仓储系统这个国内空白的领域进行深入研究及实际运行。',
        introImgs: [
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180'
        ],
        shareNum: 100,
        commentNum: 100,
        zanNum: 100
      },
      {
        id: 2,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        name: '默默',
        date: '2020-06-13',
        intro:
          '快仓公司成立于2014年，专注于提供智能仓储解决方案，公司以“成为智能仓储最佳践行者”为己任，不仅集仓储机器人的研发、生产、销售、项目实施、管理、服务为一体，更注重于在智能仓储系统这个国内空白的领域进行深入研究及实际运行。',
        introImgs: [
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180'
        ],
        shareNum: 100,
        commentNum: 100,
        zanNum: 100
      },
      {
        id: 3,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        name: '默默',
        date: '2020-06-13',
        intro:
          '快仓公司成立于2014年，专注于提供智能仓储解决方案，公司以“成为智能仓储最佳践行者”为己任，不仅集仓储机器人的研发、生产、销售、项目实施、管理、服务为一体，更注重于在智能仓储系统这个国内空白的领域进行深入研究及实际运行。',
        introImgs: [
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180'
        ],
        shareNum: 100,
        commentNum: 100,
        zanNum: 100
      },
      {
        id: 4,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        name: '默默',
        date: '2020-06-13',
        intro:
          '快仓公司成立于2014年，专注于提供智能仓储解决方案，公司以“成为智能仓储最佳践行者”为己任，不仅集仓储机器人的研发、生产、销售、项目实施、管理、服务为一体，更注重于在智能仓储系统这个国内空白的领域进行深入研究及实际运行。',
        introImgs: [
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180'
        ],
        shareNum: 100,
        commentNum: 100,
        zanNum: 100
      }
    ]
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
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
