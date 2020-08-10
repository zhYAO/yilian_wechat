import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.less'

const CompanyDetailCard = props => {
  const { card } = props

  return (
    <View className="container">
      <Image className="container__img" src={card.src} />
      <View className="container__content">
        <Text className="container__content__title">{card.title}</Text>
        <Text className="container__content__intro">{card.intro}</Text>
        <View className="container__content__labels">
          {card.labels &&
            card.labels.length > 0 &&
            card.labels.map(item => <View className="labels__item">{item}</View>)}
        </View>
      </View>
      <View className="container__btn">
        + 关注
      </View>
    </View>
  )
}

CompanyDetailCard.defaultProps = {
  card: {}
}

export default CompanyDetailCard
