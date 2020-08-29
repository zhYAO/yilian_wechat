import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from '@tarojs/redux'
import FocusCard from '@components/page-components/focus-card'
import CompanyDetailCard from '@components/page-components/company-detail-card'
import NavigationBar from '@components/page-components/navigation-bar'
import './index.less'

const MyFocus = props => {
  const {
    dispatch,
    myFocus: {
      current,
      tabList,
      attentionList: { companys = [], users = [] }
    },
    loading
  } = props

  useDidShow(() => {
    getList()
  })

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
    <View className="container">
      <NavigationBar title="我的关注" hasLeftIcon={true} />

      <AtTabs current={current} tabList={tabList} onClick={handleClick}>
        <AtTabsPane current={current} index={0}>
          <View>
            {users.map(item => {
              return <FocusCard handleInit={getList} card={item} />
            })}
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View>
            {companys.map(item => {
              return <CompanyDetailCard handleInit={getList} card={item} />
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
