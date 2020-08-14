import Taro, { useDidShow } from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import FocusCard from '@components/page-components/focus-card'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import './index.less'

const MyFansPage = props => {
  const {
    dispatch,
    common: { navBarPaddingTop },
    myFansPage: { fansList, pageSize, page, hasNextPage },
    loading
  } = props

  useDidShow(() => {
    getList(true)
  }, [])

  const handleBack = () => {
    navigateBack()
  }

  const getList = (isReset = false) => {
    if (hasNextPage) {
      dispatch({
        type: 'myFansPage/effectsFansList',
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
      onScrollToLower={getList}
      scrollY
    >
      <AtNavBar onClickLeftIcon={handleBack} title="我的粉丝" leftIconType="chevron-left" />

      {fansList.map(item => {
        return <FocusCard key={item.id} card={item} />
      })}
    </ScrollView>
  )
}

export default connect(({ common, myFansPage, loading }) => ({
  common,
  myFansPage,
  loading
}))(MyFansPage)
