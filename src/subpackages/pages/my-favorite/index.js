import Taro, { useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs } from 'taro-ui'
import { connect } from '@tarojs/redux'
import ProductCardFav from '@components/page-components/product-card-fav'
import PositionCardFav from '@components/page-components/position-card-fav'
import DynamicCardFav from '@components/page-components/dynamic-card-fav'
import NavigationBar from '@components/page-components/navigation-bar'
import './index.less'

const MyFavorite = props => {
  const {
    dispatch,
    myFavorite: { current, tabList, dynamicList = [], positionList = [], productList = [] },
    loading
  } = props

  useDidShow(() => {
    getList(true)
  }, [])

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
    <View className="container">
      <NavigationBar title="我的收藏" hasLeftIcon={true} />

      <AtTabs current={current} tabList={tabList} onClick={handleClick}></AtTabs>

      {current === 0 && (
        <View>
          {positionList.map(item => {
            return (
              <View key={item.id}>
                <PositionCardFav handleInit={() => getList(true)} card={item} />
              </View>
            )
          })}
        </View>
      )}
      {current === 1 && (
        <View>
          {dynamicList.map(item => {
            return (
              <View key={item.id}>
                <DynamicCardFav handleInit={() => getList(true)} card={item} />
              </View>
            )
          })}
        </View>
      )}
      {current === 2 && (
        <View>
          {productList.map(item => {
            return (
              <View key={item.id}>
                <ProductCardFav handleInit={() => getList(true)} card={item} />
              </View>
            )
          })}
        </View>
      )}
    </View>
  )
}
export default connect(({ common, myFavorite, loading }) => ({
  common,
  myFavorite,
  loading
}))(MyFavorite)
