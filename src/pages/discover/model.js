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
    jobList: [
      {
        id: 0,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        jobTitle: '产品经理',
        place: '算法部',
        area: '杭州宝信科技有限公司',
        city: '上海',
        time: '刚刚发布'
      },
      {
        id: 1,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        jobTitle: '产品经理',
        place: '算法部',
        area: '杭州宝信科技有限公司',
        city: '上海',
        time: '刚刚发布'
      },
      {
        id: 2,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        jobTitle: '产品经理',
        place: '算法部',
        area: '杭州宝信科技有限公司',
        city: '上海',
        time: '刚刚发布'
      }
    ],
    videoList: [
      {
        id: 0,
        title: '杭州宝信科技有限公司',
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        desc: '杭州宝信科技有限公司'
      },
      {
        id: 1,
        title: '杭州宝信科技有限公司',
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        desc: '杭州宝信科技有限公司'
      },
      {
        id: 2,
        title: '杭州宝信科技有限公司',
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        desc: '杭州宝信科技有限公司'
      }
    ],
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
    *effectsDemo(_, { call, put }) {
      const { status, data } = yield call(discoverApi.demo, {})
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
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
