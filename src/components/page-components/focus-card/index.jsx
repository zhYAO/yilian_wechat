import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import { attentionRequest, attentionRemoveRequest } from '@service/user-controller'
import { showToast } from '@crossplatform/apiservice/toast'
import './index.less'

const FocusCard = props => {
  const { card, handleInit } = props

  const [btnName, setBtnName] = useState(card.isAttention ? '取消关注' : '+ 关注')
  const [isAttention, setIsAttention] = useState(card.isAttention)

  useEffect(() => {
    setBtnName(card.isAttention ? '取消关注' : '+ 关注')
    setIsAttention(card.isAttention)
  }, [card])

  const handleClick = () => {
    navigateTo({
      url: `${pagejumplist['personal-homepage'].path}?id=${card.id}`
    })
  }

  const handleAttention = e => {
    e.stopPropagation()
    if (!isAttention) {
      attentionRequest({
        foreignId: card.id,
        type: 1
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
        type: 1
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
      <Image className="container__img" src={card.imgPath} />
      <View className="container__content">
        <Text className="container__content__title">{card.name}</Text>
        <Text className="container__content__intro">{card.theme}</Text>
        <View className="container__content__labels">
          {card.labels &&
            card.labels.length > 0 &&
            card.labels.map((item, index) => {
              if (index < 4) {
                return <View key={index} className="labels__item">{item}</View>
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

FocusCard.defaultProps = {
  card: {},
  // 执行完成之后 回调函数
  handleInit: () => {}
}

export default FocusCard
