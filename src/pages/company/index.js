import Taro, { useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import CompanyCategory from '@components/page-components/company-category'
import CustomNavigator from '@components/page-components/custom-navigator'
import CompanyCard from '@components/page-components/company-card'
import './index.less'

const Company = props => {
  const {
    company: { companyCategoryList, companyCardList },
    loading,
    common: { navBarPaddingTop }
  } = props

  useEffect(() => {
    console.log(props, 'company')
  }, [])

  return (
    <View className="company-page" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      <CustomNavigator title="公司分类" extraText=">>排序" />
      {/* 公司分类 */}
      <CompanyCategory list={companyCategoryList} />

      <CustomNavigator title="所有公司" />
      {/* 所有公司 */}
      {companyCardList.map(item => {
        return <CompanyCard key={item.id} data={item} />
      })}
    </View>
  )
}

export default connect(({ common, company, loading }) => ({
  common,
  company,
  loading
}))(Company)
