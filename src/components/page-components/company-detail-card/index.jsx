import Taro, { useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import { attentionRequest, attentionRemoveRequest } from '@service/user-controller'
import { showToast } from '@crossplatform/apiservice/toast'
import './index.less'

const CompanyDetailCard = props => {
  const { card, handleInit } = props

  const [btnName, setBtnName] = useState(card.isAttention ? '取消关注' : '+ 关注')
  const [isAttention, setIsAttention] = useState(card.isAttention)

  const handleClick = () => {
    navigateTo({
      url: `${pagejumplist['company-detail'].path}?id=${card.id}`
    })
  }

  const handleAttention = e => {
    e.stopPropagation()
    if (!card.isAttention) {
      attentionRequest({
        foreignId: card.id,
        type: 2
      }).then(() => {
        showToast({
          title: '关注成功'
        })
        setBtnName('取消关注')
        setIsAttention(true)
        if(handleInit) {
          handleInit()
        }
      })
    } else {
      attentionRemoveRequest({
        foreignId: card.id,
        type: 2
      }).then(() => {
        showToast({
          title: '取消关注'
        })
        setBtnName('+ 关注')
        setIsAttention(false)
        if(handleInit) {
          handleInit()
        }
      })
    }
  }

  return (
    <View className="container" onClick={handleClick}>
      <Image className="container__img" src={card.logoPath} />
      <View className="container__content">
        <Text className="container__content__title">{card.name}</Text>
        <Text className="container__content__intro">{card.theme}</Text>
        <View className="container__content__labels">
          {card.labels &&
            card.labels.length > 0 &&
            card.labels.map((item, index) => {
              if(index < 3) {
                return (
                  <View className="labels__item">{item}</View>
                )
              }
            })}
        </View>
      </View>
      <View className="container__btn" onClick={handleAttention}>
        {btnName}
      </View>
    </View>
  )
}

CompanyDetailCard.defaultProps = {
  card: {}
}

export default CompanyDetailCard
