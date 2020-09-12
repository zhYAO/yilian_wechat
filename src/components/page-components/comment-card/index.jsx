import Taro, { useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import CommonOptions from '@components/page-components/common-options'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import './index.less'

const CommentCard = props => {
  const {
    card,
    handleShowAction,
    handleZanClick,
    isFabulous,
    editComment,
    defaultShowComment,
    isMine,
    onShareTextChange
  } = props

  const handleClick = () => {
    if (card.type === 'USER') {
      navigateTo({
        url: `${pagejumplist['personal-homepage'].path}?id=${card.foreignId}`
      })
    } else {
      navigateTo({
        url: `${pagejumplist['company-detail'].path}?id=${card.foreignId}`
      })
    }
  }

  const goEditCommentPage = () => {
    navigateTo({
      url: `${pagejumplist['edit-comment'].path}?id=${card.id}`
    })
  }

  const handleSharePopChange = val => {
    onShareTextChange(val, card)
  }

  return (
    <View className="container">
      <View className="container__top">
        <Image className="container__top__img" src={card.imgPath} onClick={handleClick} />
        <View className="container__top__content" onClick={goEditCommentPage}>
          <View className="content__desc">
            <View className="content__name">{card.publisher}</View>
            <View className="content__date">{card.createTime}</View>
          </View>
          <View className="content__intro">{card.content}</View>
        </View>
        {!isMine && (
          <View className="container__top__options" onClick={handleShowAction}>
            <View className="options__item"></View>
            <View className="options__item"></View>
            <View className="options__item"></View>
          </View>
        )}
      </View>

      {/* 底部操作组件 */}
      <CommonOptions
        optionId={card.id}
        shareNum={card.forwardCount}
        commentNum={card.commentCount}
        zanNum={card.fabulousCount}
        handleZanClick={handleZanClick}
        isFabulous={isFabulous}
        editComment={editComment}
        comments={card.comments}
        defaultShowComment={defaultShowComment}
        onTextChange={handleSharePopChange}
        type={'DYNAMIC'}
        detail={card}
      />
    </View>
  )
}

CommentCard.defaultProps = {
  card: {},
  handleShowAction: () => {},
  handleSharePopShow: () => {},
  handleZanClick: () => {},
  isFabulous: false,
  editComment: null,
  onShareTextChange: () => {}
}

export default CommentCard
