import Taro, { useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtNavBar, AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import FocusCard from '@components/page-components/focus-card'
import './index.less'

const MyFavorite = props => {
  const {
    dispatch,
    myFavorite: { current, tabList, dynamicList, positionList, productList, focusCardsList },
    loading,
    common: { navBarPaddingTop }
  } = props

  useEffect(() => {
    getList()
  }, [])

  const handleBack = () => {
    navigateBack()
  }

  const handleClick = value => {
    dispatch({
      type: 'myFavorite/updateState',
      payload: {
        current: value
      }
    })
  }

  const getList = () => {
    dispatch({
      type: 'myFavorite/effectsFavoriteList',
      payload: {}
    })
  }

  return (
    <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      <AtNavBar onClickLeftIcon={handleBack} title="我的收藏" leftIconType="chevron-left" />

      <AtTabs current={current} tabList={tabList} onClick={handleClick}>
        <AtTabsPane current={current} index={0}>
          <View>
            {focusCardsList.map(item => {
              return <FocusCard card={item} />
            })}
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View>
            {focusCardsList.map(item => {
              return <FocusCard card={item} />
            })}
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <View>
            {focusCardsList.map(item => {
              return <FocusCard card={item} />
            })}
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  )
}
export default connect(({ common, myFavorite, loading }) => ({
  common,
  myFavorite,
  loading
}))(MyFavorite)
