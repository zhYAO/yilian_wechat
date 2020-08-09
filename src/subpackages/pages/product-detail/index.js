import Taro, { useEffect, render } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import CustomNavigator from '@components/page-components/custom-navigator'
import CommonOptions from '@components/page-components/common-options'
import './index.less'

class ProductDetail extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.getData()
  }

  handleBack = () => {
    navigateBack()
  }

  getData() {
    const { dispatch } = this.props
    const { id } = this.$router.params

    dispatch({
      type: 'productDetail/effectsDetail',
      payload: { id }
    })
  }

  render() {
    const {
      productDetail: { detail },
      loading,
      common: { navBarPaddingTop }
    } = this.props

    return (
      <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
        <AtNavBar
          onClickLeftIcon={this.handleBack}
          title={detail.name}
          leftIconType="chevron-left"
        />

        <View className="container__top">
          <Image className="container__top__banner"></Image>
          <View className="container__top__detail">
            <View className="detail__left">
              <View className="detail__left__name">{detail.name}</View>
              <View className="detail__left__desc">{detail.companyName}</View>
            </View>
            <View className="detail__right">{detail.address}</View>
          </View>
        </View>

        <CustomNavigator title="产品详情" />
        <View className="container__detail">
          <Image className="container__detail__img"></Image>
        </View>

        <View className="container__gap"></View>

        {/* 底部操作组件 */}
        <View className="container__options">
          <CommonOptions
            hasStar={true}
            shareNum={detail.forwardCount}
            commentNum={detail.commentCount}
            starNum={detail.favoriteCount}
            zanNum={detail.fabulousCount}
          />
        </View>
      </View>
    )
  }
}
export default connect(({ common, productDetail, loading }) => ({
  common,
  productDetail,
  loading
}))(ProductDetail)
