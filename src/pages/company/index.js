import Taro, { useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack, navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import CompanyCategory from '@components/page-components/company-category'
import CustomNavigator from '@components/page-components/custom-navigator'
import CompanyCard from '@components/page-components/company-card'
import './index.less'

const Company = props => {
  const {
    dispatch,
    company: { companyCategoryList, companyCardList, pageSize, page, hasNextPage },
    loading,
    common: { navBarPaddingTop }
  } = props

  useEffect(() => {
    getList()
    getLabel()
  }, [])

  const handleBack = () => {
    navigateBack()
  }

  const getList = () => {
    if (hasNextPage) {
      dispatch({
        type: 'company/effectsCompanyList',
        payload: {
          pageSize,
          page
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
    <ScrollView
      className="container"
      style={{ paddingTop: navBarPaddingTop + 'px' }}
      onScrollToLower={getList}
      scrollY
    >
      <AtNavBar onClickLeftIcon={handleBack} title="ELink" />

      <CustomNavigator title="公司分类" extraText=">>排序" rightClick={rightClick} />

      {/* 公司分类 */}
      <CompanyCategory list={companyCategoryList} />

      <CustomNavigator title="所有公司" />

      {/* 所有公司 */}
      {companyCardList.map(item => {
        return <CompanyCard key={item.id} data={item} />
      })}
    </ScrollView>
  )
}

export default connect(({ common, company, loading }) => ({
  common,
  company,
  loading
}))(Company)
