import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.less'

const VideoCard = props => {
  const { card } = props

  return (
    <View className="container">
      <Image className="container__video" src={card.src} />
      <View className="container__content">
        <View className="container__content__title">{card.title}</View>
        <View className="container__content__desc">{card.desc}</View>
      </View>
    </View>
  )
}

VideoCard.defaultProps = {
  card: {}
}

export default VideoCard
