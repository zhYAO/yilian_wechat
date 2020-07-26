import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import CommentCard from '@components/page-components/comment-card'
import './index.less'

const PersonalHomepage = props => {
  const {
    personalHomepage: {
      userInfo: { userAventor, nickname },
      comentCardList
    },
    loading,
    common: { navBarPaddingTop }
  } = props

  const handleBack = () => {
    navigateBack()
  }

  return (
    <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      <AtNavBar onClickLeftIcon={handleBack} title="莫林莫林" leftIconType="chevron-left" />

      <View className="container__user">
        <View className="container__user__info">
          <Image
            className="info__aventor"
            src={
              userAventor ||
              'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180'
            }
          ></Image>
          <View className="info__name">{nickname || '没得法士大夫'}</View>
          <View className="info__score">专注于计算机视觉和深度学习原创技术研究</View>
          <View className="info__labels">
            <View className="info__labels__item">图像</View>
            <View className="info__labels__item">大数据</View>
            <View className="info__labels__item">机器人</View>
          </View>
          <View className="info__intro">世上本没有路，走的人多了也就成了路</View>
        </View>
      </View>

      <View className="container__trends">
        <View className="container__trends__title">他的动态</View>
        <View className="container__trends__list">
          {comentCardList.map(item => {
            return (
              <View className="list__item">
                <CommentCard card={item} />
              </View>
            )
          })}
        </View>
      </View>

      <View className="container__bottom">
        <View className="container__bottom__btn">+ 关注</View>
      </View>
    </View>
  )
}

export default connect(({ common, personalHomepage, loading }) => ({
  common,
  personalHomepage,
  loading
}))(PersonalHomepage)
