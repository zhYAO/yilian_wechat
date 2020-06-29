import Taro from '@tarojs/taro'
import './index.less'

const SeachPart = props => {
  return (
    <View className="search">
      <View className="search__btn">
        <View className="search__icon"></View>
        <Text className="search__desc">输入想要查找的内容</Text>
      </View>
    </View>
  )
}

export default SeachPart
