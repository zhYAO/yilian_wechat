import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'

const CommonOptions = props => {
  const {
    shareNum,
    commentNum,
    zanNum,
    starNum,
    hasStar,
    handleSharePopShow,
    handleZanClick,
    isFabulous,
    handleFavoriteClick,
    isFavorite
  } = props

  return (
    <View>
      <View className="container">
        <View className="container__option" onClick={handleSharePopShow}>
          <Image
            className="container__option__icon"
            src={require('@static/images/common/share.png')}
            mode="aspectFit"
          ></Image>
          <View className="container__option__text">转发 {shareNum}</View>
        </View>
        <View className="container__option">
          <Image
            className="container__option__icon"
            src={require('@static/images/common/discuss.png')}
            mode="aspectFit"
          ></Image>
          <View className="container__option__text">评论 {commentNum}</View>
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
            <View className="container__option__text">收藏 {starNum}</View>
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
          <View className="container__option__text">赞 {zanNum}</View>
        </View>
      </View>
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
  handleZanClick: () => {}
}

export default CommonOptions
