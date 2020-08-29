import Taro, { useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import { favoriteRequest, favoriteRemoveRequest } from '@service/user-controller'
import { showToast } from '@crossplatform/apiservice/toast'
import './index.less'

const PositionCardFav = props => {
  const { card,  handleInit } = props

  const [btnName, setBtnName] = useState(card.isFavorite ? '取消收藏' : '收藏')
  const [isFavorite, setIsFavorite] = useState(card.isFavorite)

  const handleClick = () => {
    navigateTo({
      url: `${pagejumplist['job-detail'].path}?id=${card.id}`
    })
  }

  const handleAttention = e => {
    e.stopPropagation()
    if (!isFavorite) {
      favoriteRequest({
        foreignId: card.id,
        type: 3
      }).then(() => {
        showToast({
          title: '收藏成功'
        })
        setBtnName('取消收藏')
        setIsFavorite(true)
        if(handleInit) {
          handleInit()
        }
      })
    } else {
      favoriteRemoveRequest({
        foreignId: card.id,
        type: 3
      }).then(() => {
        showToast({
          title: '取消收藏'
        })
        setBtnName('收藏')
        setIsFavorite(false)
        if(handleInit) {
          handleInit()
        }
      })
    }
  }

  return (
    <View className="container" onClick={handleClick}>
      <Image className="container__img" src={card.src} />
      <View className="container__content">
        <Text className="container__content__title">{card.name}</Text>
        <Text className="container__content__intro">{card.name}</Text>
        <Text className="container__content__intro">{card.companyName}</Text>
      </View>
      <View className="container__btn" onClick={handleAttention}>
        {btnName}
      </View>
    </View>
  )
}

PositionCardFav.defaultProps = {
  card: {},
  handleInit: () => {}
}

export default PositionCardFav
