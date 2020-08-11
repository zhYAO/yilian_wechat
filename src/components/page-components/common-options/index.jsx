import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import './index.less'

const CommonOptions = props => {
  const {
    optionId,
    shareNum,
    commentNum,
    zanNum,
    starNum,
    hasStar,
    handleSharePopShow,
    handleZanClick,
    isFabulous,
    handleFavoriteClick,
    isFavorite,
    comments = [],
    editComment
  } = props

  const [mockComments, setMockComments] = useState([
    {
      id: 1,
      parentId: 1,
      content: '评论内容',
      type: 1,
      foreignId: 123,
      commentUserId: 22,
      commentUserName: '评论人',
      replyUserId: 33,
      replyUserName: '回复目标人',
      createTime: 'time',
      createUser: '创建人',
      subComments: [
        {
          parentId: 1,
          content: '评论内容1',
          type: 1,
          foreignId: 123,
          commentUserId: 22,
          commentUserName: '评论人1',
          replyUserId: 33,
          replyUserName: '回复目标人1',
          createTime: 'time1',
          createUser: '创建人1',
          subComments: '评论回复1'
        },
        {
          parentId: 1,
          content: '评论内容1',
          type: 1,
          foreignId: 123,
          commentUserId: 22,
          commentUserName: '评论人1',
          replyUserId: 33,
          replyUserName: '回复目标人1',
          createTime: 'time1',
          createUser: '创建人1',
          subComments: '评论回复1'
        }
      ]
    }
  ])

  const [showComment, setShowComment] = useState(false)

  const handleShowComment = () => {
    if (!editComment) {
      navigateTo({
        url: `${pagejumplist['edit-comment'].path}?id=${optionId}`
      })
    } else {
      if (!(comments && comments.length > 0)) {
        setShowComment(true)
        editComment({})
      } else {
        setShowComment(!showComment)
      }
    }
  }

  return (
    <View>
      <View className="container">
        {/* <View className="container__option" onClick={handleSharePopShow}>
          <Image
            className="container__option__icon"
            src={require('@static/images/common/share.png')}
            mode="aspectFit"
          ></Image>
          <View className="container__option__text">转发 {shareNum}</View>
        </View> */}
        <View className="container__option" onClick={handleShowComment}>
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
        </View>
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
        <View className="container__option" onClick={handleZanClick}>
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
        </View>
      </View>
      {showComment && comments.length > 0 && (
        <View className="comments">
          {comments.map(item => (
            <View className="comments__item" key={item.id}>
              <View className="comments__item__content">
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
                    {item.commentUserName}：
                  </View>
                </View>
                <View className="content__text">{item.content}</View>
              </View>
              {item.subComments &&
                item.subComments.length > 0 &&
                item.subComments.map(subItem => (
                  <View
                    className="comments__item__content comments__item__content--sub"
                    key={subItem.id}
                  >
                    <View className="content__title">
                      <View
                        className="content__title__name"
                        onClick={() =>
                          editComment({
                            commentId: item.id,
                            commentUserId: subItem.commentUserId,
                            commentUserName: subItem.commentUserName
                          })
                        }
                      >
                        {subItem.commentUserName}
                      </View>
                      <View className="content__title__re">回复</View>
                      <View
                        className="content__title__name"
                        onClick={() =>
                          editComment({
                            commentId: item.id,
                            commentUserId: subItem.commentUserId,
                            commentUserName: subItem.commentUserName
                          })
                        }
                      >
                        {subItem.replyUserName}：
                      </View>
                    </View>
                    <View className="content__text">{subItem.content}</View>
                  </View>
                ))}
            </View>
          ))}
        </View>
      )}
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
