import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import './index.less'

const ProductCardFav = props => {
  const { card } = props

  const handleClick = () => {
    navigateTo({
      url: `${pagejumplist['product-detail'].path}?id=${card.id}`
    })
  }

  return (
    <View className="container" onClick={handleClick}>
      <Image className="container__img" src={card.src} />
      <View className="container__content">
        <Text className="container__content__title">{card.name}</Text>
        <Text className="container__content__intro">{card.companyName}</Text>
      </View>
      <View className="container__btn">
        收藏
      </View>
    </View>
  )
}

ProductCardFav.defaultProps = {
  card: {}
}

export default ProductCardFav
