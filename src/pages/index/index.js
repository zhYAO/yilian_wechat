import Taro, { useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import TabBar from '../../components/page-components/TabBar'
import './index.less'

const Index = props => {
  const { index, loading } = props
  useEffect(() => {
    console.log(props)
  }, [])
  return (
    <View className="index-page">
      <TabBar />
    </View>
  )
}
Index.config = {
  navigationBarTitleText: 'index'
}
//全局样式继承 你可以关掉
Index.options = {
  addGlobalClass: true
}
export default connect(({ index, loading }) => ({
  index,
  loading
}))(Index)
