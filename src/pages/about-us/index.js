import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtNavBar, AtInput } from 'taro-ui'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import { connect } from '@tarojs/redux'
import NavigationBar from '@components/page-components/navigation-bar'
import './index.less'

const AboutUs = props => {
  const { aboutUs, loading } = props

  const handleBack = () => {
    navigateBack()
  }

  return (
    <View className="container">
      <NavigationBar title="关于我们" hasLeftIcon={true} />

      <View className="container__content">
        <Image
          className="container__content__logo"
          src={require('@static/images/common/logo.png')}
          mode="widthFix"
        />
        <View className="container__content__name">Enstar盈企达</View>
        <View className="container__content__version">v1.0</View>

        <View className="container__content__desc">
          Enstar盈企达是为用户提供企业营销的平台，专注于提升中小微企业的品牌影响力
        </View>
      </View>

      <View className="container__bottom">
        <View className="container__bottom__text">版权所有</View>
        <View className="container__bottom__text">
          Copyright © 2020 All Rights Reserved. 版权所有
        </View>
      </View>
    </View>
  )
}

export default connect(({ common, aboutUs, loading }) => ({
  common,
  aboutUs,
  loading
}))(AboutUs)
