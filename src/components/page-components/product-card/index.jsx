import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.less'

const ProductCard = props => {
  const { card } = props

  return (
    <View className="container">
      <Image className="container__video" src={card.imgPath} />
      <View className="container__content">
        <View className="container__content__title">{card.name}</View>
      </View>
    </View>
  )
}

ProductCard.defaultProps = {
  card: {}
}

export default ProductCard
