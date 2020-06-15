import Taro, { useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtSearchBar } from 'taro-ui'
import './index.less'

const Index = props => {
  const {
    dispatch,
    common: { navBarPaddingTop },
    home: { searchData }
  } = props

  useEffect(() => {
    console.log(props)
  }, [])

  const handleChange = val => {
    console.log(val, 'searchVal')
    dispatch({
      type: 'home/updateState',
      payload: {
        searchData: val
      }
    })
  }

  return (
    <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      <View className="container__search">
        <View className="container__search__btn">
          <View className="search__icon"></View>
          <Text className="search__desc">搜索你想要的</Text>
        </View>
      </View>
    </View>
  )
}
//全局样式继承 你可以关掉
// Index.options = {
//   addGlobalClass: true
// }
export default connect(({ common, home }) => ({
  common,
  home
}))(Index)
