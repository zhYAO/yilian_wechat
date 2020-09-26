import Taro, { useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import SharePop from '@components/page-components/share-pop'
import './index.less'

const CommonOptions = props => {
  const {
    optionId,
    shareNum,
    commentNum,
    zanNum,
    starNum,
    hasStar,
    // 工作详情的特殊样式
    specType = false,
    handleZanClick,
    isFabulous,
    handleFavoriteClick,
    isFavorite,
    comments = [],
    editComment,
    defaultShowComment,
    type,
    detail
  } = props

  const [showComment, setShowComment] = useState(!!defaultShowComment)
  const [shareOpened, setShareOpened] = useState(false)

  const handleShowComment = () => {
    if (!editComment) {
      navigateTo({
        url: `${pagejumplist['edit-comment'].path}?id=${optionId}`
      })
    } else {
      setShowComment(!showComment)
      if (!showComment) {
        editComment({})
      }
    }
  }

  const handleClick = id => {
    navigateTo({
      url: `${pagejumplist['personal-homepage'].path}?id=${id}`
    })
  }

  const handleSharePopShow = () => {
    setShareOpened(!shareOpened)
  }

  return (
    <View>
      <View className={`container ${specType ? 'container-spec' : ''}`}>
        <View className="container__option" onClick={handleSharePopShow}>
          <Image
            className="container__option__icon"
            src={require('@static/images/common/share.png')}
            mode="aspectFit"
          ></Image>
          <View className="container__option__text">转发 {shareNum}</View>
        </View>
        {!specType && <View className="container__option" onClick={handleShowComment}>
          <Image
            className="container__option__icon"
            src={
              showComment
                ? require('@static/images/common/discuss__active.png')
                : require('@static/images/common/discuss.png')
            }
            mode="aspectFit"
          ></Image>
          <View className={`container__option__text ${showComment ? 'text__active' : ''}`}>
            评论 {commentNum}
          </View>
        </View>}
        {hasStar && (
          <View className="container__option" onClick={handleFavoriteClick}>
            <Image
              className="container__option__icon"
              src={
                isFavorite
                  ? require('@static/images/common/star__active.png')
                  : require('@static/images/common/star.png')
              }
              mode="aspectFit"
            ></Image>
            <View className={`container__option__text ${isFavorite ? 'text__active' : ''}`}>
              收藏 {starNum}
            </View>
          </View>
        )}
        {!specType && <View className="container__option" onClick={handleZanClick}>
          <Image
            className="container__option__icon"
            src={
              isFabulous
                ? require('@static/images/common/zan__active.png')
                : require('@static/images/common/zan.png')
            }
            mode="aspectFit"
          ></Image>
          <View className={`container__option__text ${isFabulous ? 'text__active' : ''}`}>
            赞 {zanNum}
          </View>
        </View>}
      </View>
      {showComment && comments.length > 0 && (
        <View className="comments">
          {comments.map(item => (
            <View className="comments__item" key={item.id}>
              <View className="comments__item__content">
                <Image
                  className="content__img"
                  src={item.commentUserImgpath}
                  mode="aspectFit"
                  onClick={() => handleClick(item.commentUserId)}
                />
                <View className="content__title">
                  <View
                    className="content__title__name"
                    onClick={() =>
                      editComment({
                        commentId: item.id,
                        commentUserId: item.commentUserId,
                        commentUserName: item.commentUserName
                      })
                    }
                  >
                    <View>{item.commentUserName}：</View>
                    <View className="name__date">{item.createTime}</View>
                  </View>
                  <View className="content__title__text">{item.content}</View>
                </View>
              </View>
              {item.subComments &&
                item.subComments.length > 0 &&
                item.subComments.map(subItem => (
                  <View
                    className="comments__item__content comments__item__content--sub"
                    key={subItem.id}
                  >
                    <Image
                      className="content__img"
                      src={subItem.commentUserImgpath}
                      mode="aspectFit"
                      onClick={() => handleClick(subItem.commentUserId)}
                    />
                    <View className="content__title">
                      <View
                        className="content__title__name"
                        onClick={() =>
                          editComment({
                            commentId: subItem.id,
                            commentUserId: subItem.commentUserId,
                            commentUserName: subItem.commentUserName
                          })
                        }
                      >
                        <View>{subItem.commentUserName}：</View>
                        <View className="name__date">{subItem.createTime}</View>
                      </View>
                      <View
                        className="content__title__content"
                        onClick={() =>
                          editComment({
                            commentId: subItem.id,
                            commentUserId: subItem.commentUserId,
                            commentUserName: subItem.commentUserName
                          })
                        }
                      >
                        <View className="content__title__re">回复</View>
                        <View className="content__title__replyName">{subItem.replyUserName}：</View>
                        <View className="content__text">{subItem.content}</View>
                      </View>
                    </View>
                  </View>
                ))}
            </View>
          ))}
        </View>
      )}

      <SharePop isOpened={shareOpened} onClose={handleSharePopShow} type={type} detail={detail} />
    </View>
  )
}

CommonOptions.defaultProps = {
  shareNum: 0,
  commentNum: 0,
  zanNum: 0,
  starNum: 0,
  hasStar: false,
  handleSharePopShow: () => {},
  handleZanClick: () => {},
  isFabulous: false,
  handleFavoriteClick: () => {},
  isFavorite: false,
  comments: [],
  editComment: null
}

export default CommonOptions
