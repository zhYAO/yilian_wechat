import Taro, { useDidShow, useDidHide, useReachBottom } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import FocusCard from '@components/page-components/focus-card'
import NavigationBar from '@components/page-components/navigation-bar'
import './index.less'

const FriendList = props => {
  const {
    dispatch,
    friendList: { focusCardsList, pageSize, page, hasNextPage },
    loading
  } = props

  useDidShow(() => {
    getList(true)
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

  useReachBottom(() => {
    getList()
  })

  const getList = (isReset = false) => {
    if (hasNextPage || isReset) {
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
    <ScrollView className="container">
      <NavigationBar title="发现好友" hasLeftIcon={true} />
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
