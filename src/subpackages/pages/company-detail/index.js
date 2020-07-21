import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack, navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import './index.less'

const CompanyDetail = props => {
  const {
    common: {
      navBarPaddingTop,
      userInfo: { nickname, userAventor }
    },
    companyDetail,
    loading
  } = props

  const handleBack = () => {
    navigateBack()
  }

  const handleNavigate = pageUrl => {
    navigateTo({
      url: `${pagejumplist[pageUrl].path}`
    })
  }

  return (
    <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      <AtNavBar onClickLeftIcon={handleBack} title="有限公司" leftIconType="chevron-left" />

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
          <View className="info__score">我的积分</View>
          <View className="info__myInfo">我的资料</View>
        </View>
      </View>
    </View>
  )
}

export default connect(({ common, companyDetail, loading }) => ({
  common,
  companyDetail,
  loading
}))(CompanyDetail)
