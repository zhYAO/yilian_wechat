import Taro, { useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import { favoriteRequest, favoriteRemoveRequest } from '@service/user-controller'
import { showToast } from '@crossplatform/apiservice/toast'
import './index.less'

const DynamicCardFav = props => {
  const { card, noBtn } = props

  const [btnName, setBtnName] = useState(card.isFavorite ? '取消收藏' : '收藏')
  const [isFavorite, setIsFavorite] = useState(card.isFavorite)

  const handleClick = () => {
    navigateTo({
      url: `${pagejumplist['personal-homepage'].path}?id=${card.id}`
    })
  }

  const handleAttention = e => {
    e.stopPropagation()
    if (!isFavorite) {
      favoriteRequest({
        foreignId: card.id,
        type: 5
      }).then(() => {
        showToast({
          title: '收藏成功'
        })
        setBtnName('取消收藏')
        setIsFavorite(true)
      })
    } else {
      favoriteRemoveRequest({
        foreignId: card.id,
        type: 5
      }).then(() => {
        showToast({
          title: '取消收藏'
        })
        setBtnName('收藏')
        setIsFavorite(false)
      })
    }
  }

  return (
    <View className="container" onClick={handleClick}>
      <Image className="container__img" src={card.src} />
      <View className="container__content">
        <Text className="container__content__title">{card.publisher}</Text>
        <Text className="container__content__intro">{card.createTime}</Text>
        <Text className="container__content__intro">{card.content}</Text>
      </View>
      {!noBtn && (
        <View className="container__btn" onClick={handleAttention}>
          {btnName}
        </View>
      )}
    </View>
  )
}

DynamicCardFav.defaultProps = {
  card: {},
  noBtn: false
}

export default DynamicCardFav
