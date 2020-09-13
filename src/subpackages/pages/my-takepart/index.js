import Taro, { useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs } from 'taro-ui'
import { connect } from '@tarojs/redux'
import ProductCardFav from '@components/page-components/product-card-fav'
import CompanyCard from '@components/page-components/company-card'
import DynamicCardFav from '@components/page-components/dynamic-card-fav'
import NavigationBar from '@components/page-components/navigation-bar'
import './index.less'

const MyTakepart = props => {
  const {
    dispatch,
    myTakepart: { current, tabList, dynamicList = [], companys = [], products = [] },
    loading
  } = props

  useDidShow(() => {
    getList(true)
  }, [])

  const handleClick = value => {
    dispatch({
      type: 'myTakepart/updateState',
      payload: {
        current: value
      }
    })
  }

  const getList = () => {
    dispatch({
      type: 'myTakepart/effectsTakePart',
      payload: {}
    })
  }

  return (
    <View className="container">
      <NavigationBar title="我参与的" hasLeftIcon={true} />

      <AtTabs current={current} tabList={tabList} onClick={handleClick}></AtTabs>

      {current === 0 && (
        <View>
          {companys.map(item => {
            return (
              <View key={item.id}>
                <CompanyCard card={item} noBtn={true} />
              </View>
            )
          })}
        </View>
      )}

      {current === 1 && (
        <View>
          {products.map(item => {
            return (
              <View key={item.id}>
                <ProductCardFav card={item} noBtn={true} />
              </View>
            )
          })}
        </View>
      )}

      {current === 2 && (
        <View>
          {dynamicList.map(item => {
            return (
              <View key={item.id}>
                <DynamicCardFav card={item} noBtn={true} />
              </View>
            )
          })}
        </View>
      )}
    </View>
  )
}
export default connect(({ common, myTakepart, loading }) => ({
  common,
  myTakepart,
  loading
}))(MyTakepart)
