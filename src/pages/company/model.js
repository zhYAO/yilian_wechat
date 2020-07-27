import * as companyApi from './service'

export default {
  namespace: 'company',
  state: {
    companyCategoryList: [
      {
        id: 1,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        title: '智能驾驶'
      },
      {
        id: 2,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        title: '图像视觉'
      },
      {
        id: 3,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        title: '语音技术'
      },
      {
        id: 4,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        title: '大数据'
      },
      {
        id: 5,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        title: 'XR'
      },
      {
        id: 6,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        title: 'AI芯片'
      },
      {
        id: 7,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        title: 'AI硬件'
      },
      {
        id: 8,
        src:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        title: 'AR'
      }
    ],
    companyCardList: [
      {
        id: 1,
        picUrl:
          'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        companyName: '商汤科技有限公司',
        desc: '专注于计算机视觉和深度学习',
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
        id: 2,
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
        id: 3,
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
    ],
  },

  effects: {
    *effectsCompanyList(_, { call, put }) {
      const { data } = yield call(companyApi.companyList, {})
      if (data) {
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
