import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtNavBar, AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import FocusCard from '@components/page-components/focus-card'
import CompanyDetailCard from '@components/page-components/company-detail-card'
import './index.less'

const MyFocus = props => {
  const {
    dispatch,
    myFocus: {
      current,
      tabList,
      attentionList: { companys = [], users = [] }
    },
    loading,
    common: { navBarPaddingTop }
  } = props

  useDidShow(() => {
    getList()
  })

  const handleBack = () => {
    navigateBack()
  }

  const handleClick = value => {
    dispatch({
      type: 'myFocus/updateState',
      payload: {
        current: value
      }
    })
  }

  const getList = () => {
    dispatch({
      type: 'myFocus/effectsAttentionList',
      payload: {}
    })
  }

  return (
    <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      <AtNavBar onClickLeftIcon={handleBack} title="我的关注" leftIconType="chevron-left" />

      <AtTabs current={current} tabList={tabList} onClick={handleClick}>
        <AtTabsPane current={current} index={0}>
          <View>
            {users.map(item => {
              return <FocusCard card={item} />
            })}
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View>
            {companys.map(item => {
              return <CompanyDetailCard card={item} />
            })}
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  )
}
export default connect(({ common, myFocus, loading }) => ({
  common,
  myFocus,
  loading
}))(MyFocus)
