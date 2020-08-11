import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import './index.less'

const DynamicCardFav = props => {
  const { card } = props

  const handleClick = () => {
    navigateTo({
      url: `${pagejumplist['personal-homepage'].path}?id=${card.id}`
    })
  }

  return (
    <View className="container" onClick={handleClick}>
      <Image className="container__img" src={card.src} />
      <View className="container__content">
        <Text className="container__content__title">{card.publisher}</Text>
        <Text className="container__content__intro">{card.createTime}</Text>
        <Text className="container__content__intro">{card.content}</Text>
      </View>
      <View className="container__btn">
        收藏
      </View>
    </View>
  )
}

DynamicCardFav.defaultProps = {
  card: {}
}

export default DynamicCardFav
