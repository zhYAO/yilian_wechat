import * as indexApi from './service'

export default {
  namespace: 'home',
  state: {
    searchData: '',
    bannerList: [
      {
        id: 1,
        picUrl:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        url: 'www.baidu.com'
      },
      {
        id: 2,
        picUrl:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        url: 'www.baidu.com'
      },
      {
        id: 3,
        picUrl:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        url: 'www.baidu.com'
      },
      {
        id: 4,
        picUrl:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        url: 'www.baidu.com'
      },
      {
        id: 5,
        picUrl:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        url: 'www.baidu.com'
      }
    ],
    recommendCardList: [
      {
        id: 1,
        picUrl:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        companyName: '商汤科技有限公司',
        desc: '专注于计算机视觉和深度学习原创技术研发',
        label: '最新',
        area: '北京, 2014年',
        cards: [
          {
            id: 1,
            text: '图像视觉'
          },
          {
            id: 2,
            text: '机器人'
          },
          {
            id: 3,
            text: '大数据'
          }
        ]
      },
      {
        id: 1,
        picUrl:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        companyName: '商汤科技有限公司',
        desc: '专注于计算机视觉和深度学习原创技术研发',
        label: '最新',
        area: '北京, 2014年',
        cards: [
          {
            id: 1,
            text: '图像视觉'
          },
          {
            id: 2,
            text: '机器人'
          },
          {
            id: 3,
            text: '大数据'
          }
        ]
      },
      {
        id: 1,
        picUrl:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        companyName: '商汤科技有限公司',
        desc: '专注于计算机视觉和深度学习原创技术研发',
        label: '最新',
        area: '北京, 2014年',
        cards: [
          {
            id: 1,
            text: '图像视觉'
          },
          {
            id: 2,
            text: '机器人'
          },
          {
            id: 3,
            text: '大数据'
          }
        ]
      }
    ]
  },

  effects: {
    *effectsDemo(_, { call, put }) {
      const { status, data } = yield call(indexApi.demo, {})
      if (status === 'ok') {
        yield put({
          type: 'updateState',
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
