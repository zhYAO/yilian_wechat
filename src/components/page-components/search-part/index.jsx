import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.less'

const SeachPart = props => {
  return (
    <View className="search">
      <View className="search__local">
        <Image
          className="search__local__image"
          src={require('@static/images/home/local.png')}
          mode="aspectFill"
        ></Image>
        <Text className="search__local__area">上海</Text>
      </View>
      <View className="search__btn">
        <Image
          className="search__icon"
          src={require('@static/images/home/search.png')}
          mode="aspectFill"
        ></Image>
        <Text className="search__desc">输入想要查找的内容</Text>
      </View>
    </View>
  )
}

export default SeachPart
