import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import './index.less'

const ClassList = props => {
  const { card } = props

  const handleClick = () => {
    navigateTo({
      url: `${pagejumplist['company-detail'].path}?id=${card.id}`
    })
  }

  return (
    <View className="container" onClick={handleClick}>
      <Image className="container__img" src={card.imgPath}></Image>
      <View className="container__content">
        <View className="container__content__title">{card.name}</View>
        <View className="container__content__place">{card.theme}</View>
          <View className="container__content__cards">
            {card.labels.map((cardItem, index) => {
              return (
                <View key={index} className="container__content__card">
                  {cardItem}
                </View>
              )
            })}
          </View>
      </View>
      <View className="container__right">
        <View className="container__right__date">{card.registerTime}</View>
        <View className="container__right__city">{card.registerAddress}</View>
      </View>
    </View>
  )
}

ClassList.defaultProps = {
  card: {}
}

export default ClassList
