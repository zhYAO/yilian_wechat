import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.less'

const MineNavigator = props => {
  const { iconSrc, showArrow, title } = props

  return (
    <View className="container">
      <View className="container__right">
        <Image className="container__right__icon" src={iconSrc}></Image>
        <View className="container__right__title">{title}</View>
      </View>
      {showArrow && <AtIcon value="chevron-right" size="30"></AtIcon>}
    </View>
  )
}

MineNavigator.defaultProps = {
  iconSrc: '',
  showArrow: true,
  title: ''
}

export default MineNavigator
