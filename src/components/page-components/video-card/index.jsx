import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.less'

const VideoCard = props => {
  const { card } = props

  return (
    <View className="container">
      <Image className="container__video" src={card.imgPath} />
      <View className="container__content">
        <View className="container__content__title">{card.companyName || card.foreignName}</View>
        <View className="container__content__desc">{card.name}</View>
      </View>
    </View>
  )
}

VideoCard.defaultProps = {
  card: {}
}

export default VideoCard
