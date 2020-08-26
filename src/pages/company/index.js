import Taro, { useDidShow, useReachBottom } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import CompanyCategory from '@components/page-components/company-category'
import CustomNavigator from '@components/page-components/custom-navigator'
import CompanyCard from '@components/page-components/company-card'
import NavigationBar from '@components/page-components/navigation-bar'
import './index.less'

const Company = props => {
  const {
    dispatch,
    company: { companyCategoryList, companyCardList, pageSize, page, hasNextPage },
    loading
  } = props

  useDidShow(() => {
    getList(true)
    getLabel()
  }, [])

  useReachBottom(() => {
    getList()
  })

  const getList = (isReset = false) => {
    if (hasNextPage || isReset) {
      dispatch({
        type: 'company/effectsCompanyList',
        payload: {
          pageSize,
          page,
          isReset
        }
      })
    }
  }

  const getLabel = () => {
    dispatch({
      type: 'company/effectsLabelList',
      payload: {
        pageSize,
        page
      }
    })
  }

  const rightClick = () => {
    navigateTo({
      url: `${pagejumplist['class-sort'].path}`
    })
  }

  return (
    <View className="container">
      <NavigationBar title="ELink" />

      <CustomNavigator title="公司分类" extraText=">>排序" rightClick={rightClick} />

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
