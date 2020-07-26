import Taro, { useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtIcon, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import CommonOptions from '@components/page-components/common-options'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import './index.less'

const CommentCard = props => {
  const { card } = props
  const [isOpened, setIsOpened] = useState(false)

  const handleClick = () => {
    navigateTo({
      url: `${pagejumplist['personal-homepage'].path}`
    })
  }

  const onShow = () => {
    setIsOpened(true)
  }

  const onCancel = () => {
    setIsOpened(false)
  }

  return (
    <View className="container">
      <View className="container__top">
        <Image className="container__top__img" src={card.src} onClick={handleClick} />
        <View className="container__top__content">
          <View className="content__desc">
            <View className="content__name">{card.name}</View>
            <View className="content__date">{card.date}</View>
          </View>
          <View className="content__intro">{card.intro}</View>
        </View>
        <View className="container__top__options" onClick={onShow}>
          <AtIcon value="list" size="30" color="#F77E03"></AtIcon>
        </View>
      </View>

      {/* 底部操作组件 */}
      <CommonOptions shareNum={card.shareNum} commentNum={card.commentNum} zanNum={card.zanNum} />

      <AtActionSheet isOpened={isOpened} cancelText="取消" onCancel={onCancel} onClose={onCancel}>
        <AtActionSheetItem>关注作者</AtActionSheetItem>
        <AtActionSheetItem>收藏动态</AtActionSheetItem>
        <AtActionSheetItem>举报</AtActionSheetItem>
      </AtActionSheet>
    </View>
  )
}

CommentCard.defaultProps = {
  card: {}
}

export default CommentCard
