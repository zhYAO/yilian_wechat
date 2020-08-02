import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import SharePop from '@components/page-components/share-pop'
import './index.less'

const CommonOptions = props => {
  const { shareNum, commentNum, zanNum, starNum, hasStar } = props

  const [isShareOpened, setIsShareOpened] = useState(false)

  const handleSharePopShow = () => {
    setIsShareOpened(true)
  }

  const handleSharePopClose = () => {
    setIsShareOpened(false)
  }
  return (
    <View>
      <View className="container">
        <View className="container__option" onClick={handleSharePopShow}>
          <AtIcon value="share" size="16" color="black" className="option__icon"></AtIcon>
          <View className="container__option__text">转发 {shareNum}</View>
        </View>
        <View className="container__option">
          <AtIcon value="money" size="16" color="black" className="option__icon"></AtIcon>
          <View className="container__option__text">评论 {commentNum}</View>
        </View>
        {hasStar && (
          <View className="container__option">
            <AtIcon value="money" size="16" color="black" className="option__icon"></AtIcon>
            <View className="container__option__text">收藏 {starNum}</View>
          </View>
        )}
        <View className="container__option">
          <AtIcon value="star" size="16" color="black" className="option__icon"></AtIcon>
          <View className="container__option__text">赞 {zanNum}</View>
        </View>
      </View>
      {/* <SharePop isOpened={isShareOpened} onClose={handleSharePopClose} /> */}
    </View>
  )
}

CommonOptions.defaultProps = {
  shareNum: 0,
  commentNum: 0,
  zanNum: 0,
  starNum: 0,
  hasStar: false
}

export default CommonOptions
