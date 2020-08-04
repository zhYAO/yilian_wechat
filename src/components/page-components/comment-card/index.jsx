import Taro, { useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import CommonOptions from '@components/page-components/common-options'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import './index.less'

const CommentCard = props => {
  const { card, handleShowAction, handleSharePopShow } = props

  const handleClick = () => {
    navigateTo({
      url: `${pagejumplist['personal-homepage'].path}`
    })
  }

  return (
    <View className="container">
      <View className="container__top">
        <Image className="container__top__img" src={card.src} onClick={handleClick} />
        <View className="container__top__content">
          <View className="content__desc">
            <View className="content__name">{card.publisher}</View>
            <View className="content__date">{card.createTime}</View>
          </View>
          <View className="content__intro">{card.content}</View>
        </View>
        <View className="container__top__options" onClick={handleShowAction}>
          <View className="options__item"></View>
          <View className="options__item"></View>
          <View className="options__item"></View>
        </View>
      </View>

      {/* 底部操作组件 */}
      <CommonOptions
        shareNum={card.forwardCount}
        commentNum={card.commentCount}
        zanNum={card.fabulousCount}
        handleSharePopShow={handleSharePopShow}
      />
    </View>
  )
}

CommentCard.defaultProps = {
  card: {}
}

export default CommentCard
