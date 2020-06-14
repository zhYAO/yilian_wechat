import Taro, { useEffect } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'

const TabBar = props => {
  return (
    <AtTabBar
      tabList={[{ title: '待办事项', text: 8 }, { title: '拍照' }, { title: '通讯录', dot: true }]}
      // onClick={this.handleClick.bind(this)}
      // current={this.state.current}
    />
  )
}

export default TabBar
