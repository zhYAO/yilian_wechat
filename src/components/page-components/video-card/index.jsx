import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import './index.less'

const VideoCard = props => {
  const { card } = props

  const handleClick = () => {
    navigateTo({
      url: `${pagejumplist['video-detail'].path}?id=${card.id}`
    })
  }

  return (
    <View className="container" onClick={handleClick}>
      <Image className="container__video" mode="aspectFill" src={card.imgPath} />
      <View className="container__content">
        <View className="container__content__title">{card.foreignName}</View>
        <View className="container__content__desc">{card.company.theme}</View>
      </View>
    </View>
  )
}

VideoCard.defaultProps = {
  card: {}
}

export default VideoCard
