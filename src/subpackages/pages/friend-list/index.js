import Taro, { useDidShow, useDidHide } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtNavBar } from 'taro-ui'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import FocusCard from '@components/page-components/focus-card'
import './index.less'

const FriendList = props => {
  const {
    dispatch,
    common: { navBarPaddingTop },
    friendList: { focusCardsList, pageSize, page, hasNextPage },
    loading
  } = props

  useDidShow(() => {
    getList()
  })

  useDidHide(() => {
    dispatch({
      type: 'friendList/updateState',
      payload: {
        focusCardsList: [],
        hasNextPage: true
      }
    })
  })

  const handleBack = () => {
    navigateBack()
  }

  const getList = (isReset = false) => {
    if (hasNextPage) {
      dispatch({
        type: 'friendList/effectsRecommendList',
        payload: {
          pageSize,
          page,
          isReset
        }
      })
    }
  }

  return (
    <ScrollView
      className="container"
      style={{ paddingTop: navBarPaddingTop + 'px' }}
      onScrollToLower={() => getList()}
      scrollY
    >
      <AtNavBar onClickLeftIcon={handleBack} title="发现好友" leftIconType="chevron-left" />
      <View>
        {focusCardsList.map(item => {
          return <FocusCard card={item} />
        })}
      </View>
    </ScrollView>
  )
}

export default connect(({ common, friendList, loading }) => ({
  common,
  friendList,
  loading
}))(FriendList)
