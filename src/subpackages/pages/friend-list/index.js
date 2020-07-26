import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtNavBar } from 'taro-ui'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import FocusCard from '@components/page-components/focus-card'
import './index.less'

const FriendList = props => {
  const {
    common: { navBarPaddingTop },
    friendList: { focusCardsList },
    loading
  } = props

  const handleBack = () => {
    navigateBack()
  }

  return (
    <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      <AtNavBar onClickLeftIcon={handleBack} title="发现好友" leftIconType="chevron-left" />
      <View>
        {focusCardsList.map(item => {
          return <FocusCard card={item} />
        })}
      </View>
    </View>
  )
}

export default connect(({ common, friendList, loading }) => ({
  common,
  friendList,
  loading
}))(FriendList)
