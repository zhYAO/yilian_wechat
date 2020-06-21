import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.less'

const CompanyCard = props => {
  const { data } = props

  return (
    <View key={data.id} className="card">
      <Image className="card__img" src={data.picUrl} />
      <View className="card__content">
        <View className="card__content__left">
          <Text className="left__name">{data.companyName}</Text>
          <Text className="left__desc">{data.desc}</Text>
          <View className="left__cards">
            {data.cards.map(cardItem => {
              return (
                <View key={cardItem.id} className="left__card">
                  <Text className="card__text">{cardItem.text}</Text>
                </View>
              )
            })}
          </View>
        </View>
        <View className="card__content__right">
          {data.label && <Text className="right__label">{data.label}</Text>}
          <Text className="right__area">{data.area}</Text>
        </View>
      </View>
    </View>
  )
}

CompanyCard.defaultProps = {
  data: {
    id: null,
    picUrl: '',
    companyName: '',
    desc: '',
    label: '',
    area: '',
    cards: []
  }
}

export default CompanyCard
