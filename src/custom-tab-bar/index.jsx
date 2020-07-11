import Taro, { useEffect } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { switchTab } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'

const tabList = [
  { title: '首页', path: 'home',image: require('@static/images/tabbar/tabs_home.png') },
  { title: '公司', path: 'company',image: require('@static/images/tabbar/tabs_company.png') },
  { title: '动态', path: 'trends',image: require('@static/images/tabbar/tabs_trends.png') },
  { title: '发现', path: 'discover',image: require('@static/images/tabbar/tabs_discover.png') },
  { title: '我的', path: 'mine',image: require('@static/images/tabbar/tabs_mine.png') }
]

const TabBar = props => {
  const {
    dispatch,
    common: { tabbarIndex }
  } = props

  useEffect(() => {
    console.log(props, 'propspspspos')
  }, [])

  const handleClick = value => {
    const path = tabList[value] ? tabList[value].path || 'home' : 'home'
    switchTab({
      url: pagejumplist[path].path
    })
    dispatch({
      type: 'common/updateState',
      payload: {
        tabbarIndex: value
      }
    })
  }

  return <AtTabBar tabList={tabList} current={tabbarIndex} onClick={handleClick} />
}

export default connect(({ common }) => ({
  common
}))(TabBar)
