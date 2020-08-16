import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import CompanyCard from '@components/page-components/company-card'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import './index.less'

const RecommendListPage = props => {
  const {
    dispatch,
    common: { navBarPaddingTop },
    recommendListPage: { companyCardList, pageSize, page, hasNextPage },
    loading
  } = props

  useDidShow(() => {
    getList(true)
  }, [])

  const handleBack = () => {
    navigateBack()
  }

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
    <ScrollView
      className="container"
      style={{ paddingTop: navBarPaddingTop + 'px' }}
      onScrollToLower={getList}
      scrollY
    >
      <AtNavBar onClickLeftIcon={handleBack} title="小易推荐" leftIconType="chevron-left" />

      {companyCardList.map(item => {
        return <CompanyCard key={item.id} data={item} />
      })}
    </ScrollView>
  )
}

export default connect(({ common, recommendListPage, loading }) => ({
  common,
  recommendListPage,
  loading
}))(RecommendListPage)
