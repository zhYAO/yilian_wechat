import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import CustomNavigator from '@components/page-components/custom-navigator'
import CommonOptions from '@components/page-components/common-options'
import './index.less'

class JobDetail extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.getDetail()
  }

  handleBack = () => {
    navigateBack()
  }

  getDetail = () => {
    const { dispatch } = this.props
    const { id } = this.$router.params
    dispatch({
      type: 'jobDetail/effectsPositionDetail',
      payload: { id }
    })
  }

  render() {
    const {
      jobDetail,
      loading,
      common: { navBarPaddingTop }
    } = this.props
    return (
      <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
        <AtNavBar onClickLeftIcon={this.handleBack} title="产品经理" leftIconType="chevron-left" />

        <View className="container__intro">
          <View className="container__intro__title">产品经理</View>
          <View className="container__intro__sub">
            <View className="sub__text">中国 上海</View>
            <View className="sub__text">今日发布</View>
            <View className="sub__text">50人浏览</View>
          </View>
        </View>

        <View className="container__card">
          <Image
            className="container__card__img"
            src="https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180"
          ></Image>
          <View className="container__card__content">
            <View className="content__name">上海快仓智能科技有限公司</View>
            <View className="content__date">2020-06-13</View>
          </View>
        </View>

        <CustomNavigator title="职位描述" />

        <CustomNavigator title="任职要求" />

        <View className="container__gap"></View>

        {/* 底部操作组件 */}
        <View className="container__options">
          <CommonOptions shareNum={100} commentNum={100} zanNum={100} hasStar />
        </View>
      </View>
    )
  }
}
export default connect(({ common, jobDetail, loading }) => ({
  common,
  jobDetail,
  loading
}))(JobDetail)
