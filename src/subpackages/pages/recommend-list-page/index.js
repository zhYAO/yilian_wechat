import Taro from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import CompanyCard from '@components/page-components/company-card'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import './index.less'

const RecommendListPage = props => {
  const {
    common: { navBarPaddingTop },
    recommendListPage: { companyCardList },
    loading
  } = props

  const handleBack = () => {
    navigateBack()
  }

  return (
    <View className="recommendListPage-page" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      <AtNavBar onClickLeftIcon={handleBack} title="小易推荐" leftIconType="chevron-left" />

      <ScrollView>
        {companyCardList.map(item => {
          return <CompanyCard key={item.id} data={item} />
        })}
      </ScrollView>
    </View>
  )
}

export default connect(({ common, recommendListPage, loading }) => ({
  common,
  recommendListPage,
  loading
}))(RecommendListPage)
