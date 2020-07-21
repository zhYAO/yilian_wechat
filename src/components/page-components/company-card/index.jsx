import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import './index.less'

const CompanyCard = props => {
  const { data } = props

  const handleJumpCompany = () => {
    navigateTo({
      url: `${pagejumplist['company-detail'].path}`
    })
  }

  return (
    <View key={data.id} className="card" onClick={handleJumpCompany}>
      <View className="card__container">
        <Image className="card__img" src={data.picUrl} mode="aspectFill" />
        <View className="card__content">
          <Text className="card__content__name">{data.companyName}</Text>
          <Text className="card__content__desc">{data.desc}</Text>
          <View className="card__content__cards">
            {data.cards.map(cardItem => {
              return (
                <View key={cardItem.id} className="card__content__card">
                  {cardItem.text}
                </View>
              )
            })}
          </View>
          <View className="card__content__area">{data.area}</View>
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
