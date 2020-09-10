import Taro, { useDidShow, useReachBottom } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import CompanyCard from '@components/page-components/company-card'
import NavigationBar from '@components/page-components/navigation-bar'
import './index.less'

const RecommendListPage = props => {
  const {
    dispatch,
    recommendListPage: { companyCardList, pageSize, page, hasNextPage },
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
        type: 'recommendListPage/effectsRecommend',
        payload: {
          pageSize,
          page,
          isReset
        }
      })
    }
  }

  return (
    <View className="container">
      <NavigationBar title="星推荐" hasLeftIcon={true} />

      {companyCardList.map(item => {
        return <CompanyCard key={item.id} data={item} />
      })}
    </View>
  )
}

export default connect(({ common, recommendListPage, loading }) => ({
  common,
  recommendListPage,
  loading
}))(RecommendListPage)
