import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import Index from './pages/home/index'
import dva from './utils/dva'
import models from './models/models'
import { Provider } from '@tarojs/redux'
import wxLogin from '@utils/wxLogin'
import 'taro-ui/dist/style/index.scss'
import './app.less'
import './styles/base.less'

const dvaApp = dva.createApp({
  initialState: {},
  models: models
})
const store = dvaApp.getStore()
class App extends Component {
  config = {
    pages: [
      'pages/home/index',
      'pages/company/index',
      'pages/trends/index',
      'pages/discover/index',
      'pages/mine/index',
      'pages/about-us/index'
    ],
    window: {
      navigationStyle: 'custom',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#111111',
      borderStyle: 'black',
      selectedColor: '#6190e8',
      backgroundColor: '#ffffff',
      list: [
        {
          pagePath: 'pages/home/index',
          text: '首页',
          iconPath: './static/images/tabbar/tabs_home.png',
          selectedIconPath: './static/images/tabbar/tabs_home_active.png'
        },
        {
          pagePath: 'pages/company/index',
          text: '公司',
          iconPath: './static/images/tabbar/tabs_company.png',
          selectedIconPath: './static/images/tabbar/tabs_company_active.png'
        },
        {
          pagePath: 'pages/trends/index',
          text: '动态',
          iconPath: './static/images/tabbar/tabs_trends.png',
          selectedIconPath: './static/images/tabbar/tabs_trends_active.png'
        },
        {
          pagePath: 'pages/discover/index',
          text: '发现',
          iconPath: './static/images/tabbar/tabs_discover.png',
          selectedIconPath: './static/images/tabbar/tabs_discover_active.png'
        },
        {
          pagePath: 'pages/mine/index',
          text: '我的',
          iconPath: './static/images/tabbar/tabs_mine.png',
          selectedIconPath: './static/images/tabbar/tabs_mine_active.png'
        }
      ]
    },
    subpackages: [
      {
        root: 'subpackages',
        pages: [
          'pages/search-page/index',
          'pages/my-info/index',
          'pages/recommend-list-page/index',
          'pages/friend-list/index',
          'pages/personal-homepage/index',
          'pages/my-focus/index',
          'pages/class-sort/index',
          'pages/common-edit/index',
          'pages/industry-label/index',
          'pages/my-favorite/index',
          'pages/publish-dynamic/index',
          'pages/edit-comment/index',
          'pages/my-fans-page/index',
          'pages/my-takepart/index'
        ]
      },
      {
        root: 'detailPackages',
        pages: [
          'pages/company-detail/index',
          'pages/product-detail/index',
          'pages/class-details/index',
          'pages/job-detail/index',
          'pages/video-detail/index'
        ]
      }
    ]
  }
  componentDidMount() {
    // 处理登录逻辑
    const { dispatch, getState } = store
    const {
      common: { token }
    } = getState()
    if (!token) {
      wxLogin.doLogin().then(data => {
        dispatch({
          type: 'common/effectsUpdate',
          payload: { ...data }
        })
      })
    }
  }
  componentDidShow() {}
  componentDidHide() {}
  componentDidCatchError() {}
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}
Taro.render(<App />, document.getElementById('app'))
