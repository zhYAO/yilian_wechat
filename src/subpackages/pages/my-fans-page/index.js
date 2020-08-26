import Taro, { useDidShow, useReachBottom } from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import FocusCard from '@components/page-components/focus-card'
import NavigationBar from '@components/page-components/navigation-bar'
import './index.less'

const MyFansPage = props => {
  const {
    dispatch,
    myFansPage: { fansList, pageSize, page, hasNextPage },
    loading
  } = props

  useDidShow(() => {
    getList(true)
  }, [])

  useReachBottom(() => {
    getList()
  })

  const getList = (isReset = false) => {
    if (hasNextPage || isReset) {
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
    <ScrollView className="container">
      <NavigationBar title="我的粉丝" hasLeftIcon={true} />

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
