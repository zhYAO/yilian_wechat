import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.less'

const CommentCard = props => {
  const { card } = props

  return (
    <View className="container">
      <View className="container__top">
        <Image className="container__top__img" src={card.src} />
        <View className="container__top__content">
          <View className="content__desc">
            <View className="content__name">{card.name}</View>
            <View className="content__date">{card.date}</View>
          </View>
          <View className="content__intro">{card.intro}</View>
        </View>
        <View className="container__top__options">
          <AtIcon value="list" size="30" color="#F77E03"></AtIcon>
        </View>
      </View>
      <View className="container__options">
        <View className="container__options__option">
          <AtIcon value="share" size="16" color="black" className="option__icon"></AtIcon>
          <View className="options__text">转发 {card.shareNum}</View>
        </View>
        <View className="container__options__option">
          <AtIcon value="money" size="16" color="black" className="option__icon"></AtIcon>
          <View className="options__text">评论 {card.commentNum}</View>
        </View>
        <View className="container__options__option">
          <AtIcon value="star" size="16" color="black" className="option__icon"></AtIcon>
          <View className="options__text">赞 {card.zanNum}</View>
        </View>
      </View>
    </View>
  )
}

CommentCard.defaultProps = {
  card: {}
}

export default CommentCard
