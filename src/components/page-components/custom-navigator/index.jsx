import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

const CustomNavigator = props => {
  const { title, extraText } = props

  return (
    <View className="nav">
      <View className="nav__left">
        <View className="nav__left__icon"></View>
        <Text className="nav__left__title">{title}</Text>
      </View>
      {extraText && <Text className="nav__desc">{extraText}</Text>}
    </View>
  )
}

CustomNavigator.defaultProps = {
  title: '',
  extraText: ''
}

export default CustomNavigator
