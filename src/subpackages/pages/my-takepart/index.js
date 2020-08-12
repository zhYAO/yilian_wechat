import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtNavBar, AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import ProductCardFav from '@components/page-components/product-card-fav'
import CompanyCard from '@components/page-components/company-card'
import DynamicCardFav from '@components/page-components/dynamic-card-fav'
import './index.less'

const MyTakepart = props => {
  const {
    dispatch,
    myTakepart: { current, tabList, dynamicList = [], companys = [], productList = [] },
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
    <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      <AtNavBar onClickLeftIcon={handleBack} title="我参与的" leftIconType="chevron-left" />

      <AtTabs current={current} tabList={tabList} onClick={handleClick}>
        <AtTabsPane current={current} index={0}>
          <View>
            {companys.map(item => {
              return (
                <View key={item.id}>
                  <CompanyCard card={item} noBtn={true} />
                </View>
              )
            })}
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          {productList.map(item => {
            return (
              <View key={item.id}>
                <ProductCardFav card={item} noBtn={true} />
              </View>
            )
          })}
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          {dynamicList.map(item => {
            return (
              <View key={item.id}>
                <DynamicCardFav card={item} noBtn={true} />
              </View>
            )
          })}
        </AtTabsPane>
      </AtTabs>
    </View>
  )
}
export default connect(({ common, myTakepart, loading }) => ({
  common,
  myTakepart,
  loading
}))(MyTakepart)
