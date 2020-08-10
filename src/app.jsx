import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import Index from './pages/home/index'
import dva from './utils/dva'
import models from './models/models'
import { Provider } from '@tarojs/redux'
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
      'pages/mine/index'
    ],
    window: {
      navigationStyle: 'custom',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      custom: true,
      color: '#000000',
      selectedColor: '#000000',
      backgroundColor: '#000000',
      list: [
        {
          pagePath: 'pages/home/index',
          text: '首页'
        },
        {
          pagePath: 'pages/company/index',
          text: '公司'
        },
        {
          pagePath: 'pages/trends/index',
          text: '动态'
        },
        {
          pagePath: 'pages/discover/index',
          text: '发现'
        },
        {
          pagePath: 'pages/mine/index',
          text: '我的'
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
          'pages/company-detail/index',
          'pages/product-detail/index',
          'pages/class-details/index',
          'pages/friend-list/index',
          'pages/personal-homepage/index',
          'pages/job-detail/index',
          'pages/my-focus/index',
          'pages/class-sort/index',
          'pages/common-edit/index',
          'pages/industry-label/index',
          'pages/my-favorite/index',
          'pages/publish-dynamic/index',
          'pages/edit-comment/index'
        ]
      }
    ]
  }
  componentDidMount() {}
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
