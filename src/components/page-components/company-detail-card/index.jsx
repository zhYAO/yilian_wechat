import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import './index.less'

const CompanyDetailCard = props => {
  const { card } = props

  const handleClick = () => {
    navigateTo({
      url: `${pagejumplist['company-detail'].path}?id=${card.id}`
    })
  }

  return (
    <View className="container" onClick={handleClick}>
      <Image className="container__img" src={card.src} />
      <View className="container__content">
        <Text className="container__content__title">{card.name}</Text>
        <Text className="container__content__intro">{card.theme}</Text>
        <View className="container__content__labels">
          {card.labels &&
            card.labels.length > 0 &&
            card.labels.map(item => <View className="labels__item">{item}</View>)}
        </View>
      </View>
      <View className="container__btn">+ 关注</View>
    </View>
  )
}

CompanyDetailCard.defaultProps = {
  card: {}
}

export default CompanyDetailCard
