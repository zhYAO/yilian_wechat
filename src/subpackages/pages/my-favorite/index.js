import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtNavBar, AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import ProductCardFav from '@components/page-components/product-card-fav'
import PositionCardFav from '@components/page-components/position-card-fav'
import DynamicCardFav from '@components/page-components/dynamic-card-fav'
import './index.less'

const MyFavorite = props => {
  const {
    dispatch,
    myFavorite: { current, tabList, dynamicList = [], positionList = [], productList = [] },
    loading,
    common: { navBarPaddingTop }
  } = props

  useDidShow(() => {
    getList(true)
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
            {positionList.map(item => {
              return (
                <View key={item.id}>
                  <PositionCardFav card={item} />
                </View>
              )
            })}
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          {dynamicList.map(item => {
            return (
              <View key={item.id}>
                <DynamicCardFav card={item} />
              </View>
            )
          })}
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <View>
            {productList.map(item => {
              return (
                <View key={item.id}>
                  <ProductCardFav card={item} />
                </View>
              )
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
