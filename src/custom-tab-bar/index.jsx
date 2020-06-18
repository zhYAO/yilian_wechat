import Taro, { useEffect } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { switchTab } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'

const tabList = [
  { title: '首页', path: 'home' },
  { title: '公司', path: 'company' },
  { title: '动态', path: 'trends' },
  { title: '发现', path: 'discover' },
  { title: '我的', path: 'mine' }
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
