import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtNavBar, AtList, AtListItem } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import './index.less'

const MyInfo = props => {
  const {
    myInfo,
    loading,
    common: {
      navBarPaddingTop,
      userInfo: { nickname, userAventor }
    }
  } = props

  const handleBack = () => {
    navigateBack()
  }

  return (
    <View className="container" style={{ marginTop: navBarPaddingTop + 'px' }}>
      <AtNavBar onClickLeftIcon={handleBack} title="我的资料" leftIconType="chevron-left" />

      <View className="container__header">
        <Image
          className="container__header__img"
          src={
            userAventor ||
            'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180'
          }
        />
      </View>

      <View className="container__list">
        <AtListItem title="昵称" extraText="莫林莫林" arrow="right" />
        <AtListItem title="性别" extraText="男" arrow="right" />
        <AtListItem title="微信号" extraText="Sandy" arrow="right" />
        <AtListItem title="绑定手机号" extraText="13376225066" arrow="right" />
        <AtListItem title="邮箱" extraText="3468748857@qq.com" arrow="right" />
        <AtListItem title="公司" extraText="上海科技有限公司" arrow="right" />
        <AtListItem title="职位" extraText="UI设计师" arrow="right" />
      </View>

      <View className="container__list">
        <AtListItem title="关注领域" arrow="right" />
        <AtListItem title="座右铭" extraText="世上本没有路，走的人多了，也变成了路" arrow="right" />
      </View>
    </View>
  )
}
export default connect(({ common, myInfo, loading }) => ({
  common,
  myInfo,
  loading
}))(MyInfo)
