import Taro, { useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.less'

const CommentCard = props => {
  const { card, index, onTouchStartCard, onTouchMoveCard, onTouchEndCard } = props

  return (
    <View className="container">
      <View className="container__content">
        <Image src={card.imgPath} className="container__content__img" />
        <View className="container__content__text">
          <View className="text__name">{card.label}</View>
          <View className="text__desc">{card.label}</View>
        </View>
      </View>
      <View className="container__options">
        <View
          className="container__options__arrow"
          onTouchStart={onTouchStartCard}
          onTouchMove={onTouchMoveCard}
          onTouchEnd={onTouchEndCard}
        >
          <AtIcon value="menu" size="30" color="#333"></AtIcon>
        </View>
        {/* <View
          className="container__options__arrow"
          onClick={() => {
            handleChangeSort(card.labelId, index, 'add')
          }}
        >
          <AtIcon value="chevron-up" size="30" color="#333"></AtIcon>
        </View>
        <View
          className="container__options__arrow"
          onClick={() => {
            handleChangeSort(card.labelId, index, 'minus')
          }}
        >
          <AtIcon value="chevron-down" size="30" color="#333"></AtIcon>
        </View> */}
      </View>
    </View>
  )
}

CommentCard.defaultProps = {
  card: {},
  index: 0,
  handleChangeSort: () => {}
}

export default CommentCard
