import Taro, { useEffect } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import CustomNavigator from '@components/page-components/custom-navigator'
import './index.less'

const ProductDetail = props => {
  const {
    productDetail,
    loading,
    common: { navBarPaddingTop }
  } = props

  const handleBack = () => {
    navigateBack()
  }

  return (
    <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      <AtNavBar onClickLeftIcon={handleBack} title="智能货架搬运" leftIconType="chevron-left" />

      <View className="container__top">
        <Image className="container__top__banner"></Image>
        <View className="container__top__detail">
          <View className="detail__left">
            <View className="detail__left__name">智能货架搬运</View>
            <View className="detail__left__desc">杭州保新科技有限公司</View>
          </View>
          <View className="detail__right">上海</View>
        </View>
      </View>

      <CustomNavigator title="产品详情" />
      <View className="container__detail">
        <Image className="container__detail__img"></Image>
      </View>

      <View className="container__gap"></View>

      <View className="container__bottom">
        <View className="container__bottom__options">
          <View className="options__item">
            <Image
              className="options__item__icon"
              src={require('@static/images/common/share.png')}
              mode="aspectFit"
            ></Image>
            <View className="options__item__name">转发 100</View>
          </View>
          <View className="options__item">
            <Image
              className="options__item__icon"
              src={require('@static/images/common/discuss.png')}
              mode="aspectFit"
            ></Image>
            <View className="options__item__name">评论 100</View>
          </View>
          <View className="options__item">
            <Image
              className="options__item__icon"
              src={require('@static/images/common/star.png')}
              mode="aspectFit"
            ></Image>
            <View className="options__item__name">收藏 100</View>
          </View>
          <View className="options__item">
            <Image
              className="options__item__icon"
              src={require('@static/images/common/zan.png')}
              mode="aspectFit"
            ></Image>
            <View className="options__item__name">赞 100</View>
          </View>
        </View>
      </View>
    </View>
  )
}
export default connect(({ common, productDetail, loading }) => ({
  common,
  productDetail,
  loading
}))(ProductDetail)
