import * as personalHomepageApi from './service'

export default {
  namespace: 'personalHomepage',
  state: {
    userInfo: {
      userAventor: '',
      nickname: ''
    },
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
        id: 0,
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
        id: 0,
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
        id: 0,
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
        id: 0,
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
    *effectsDemo(_, { call, put }) {
      const { status, data } = yield call(personalHomepageApi.demo, {})
      if (status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            topData: data
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
