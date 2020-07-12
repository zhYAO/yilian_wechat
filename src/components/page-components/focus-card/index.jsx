import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.less'

const FocusCard = props => {
  const { item } = props

  return (
    <View className="container">
      <Image className="container__img" src={item.src} />
      <View className="container__content">
        <Text className="container__content__title">{item.title}</Text>
        <Text className="container__content__intro">{item.intro}</Text>
        <View className="container__content__labels">
          {item.labels &&
            item.labels.length > 0 &&
            item.labels.map(item => <View className="labels__item">{item}</View>)}
        </View>
      </View>
      <View className="container__btn">
        + 关注
      </View>
    </View>
  )
}

FocusCard.defaultProps = {
  item: {}
}

export default FocusCard
