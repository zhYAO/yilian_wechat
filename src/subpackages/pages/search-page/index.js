import Taro, { useDidShow } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import { AtNavBar, AtTabs, AtTabsPane, AtSearchBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import CompanyCard from '@components/page-components/company-card'
import ProductCard from '@components/page-components/product-card'
import CommentCard from '@components/page-components/comment-card'
import './index.less'

const SearchPage = props => {
  const {
    dispatch,
    searchPage: {
      searchVal,
      searchRecord,
      hotRecord,
      isSearch,
      searchData: { companys, dynamics, products },
      current,
      tabList
    },
    loading,
    common: { navBarPaddingTop }
  } = props

  useDidShow(() => {
    dispatch({
      type: 'searchPage/updateState',
      payload: {
        current: 0,
        searchVal: '',
        searchData: {},
        isSearch: false
      }
    })
  })

  const handleBack = () => {
    navigateBack()
  }

  const handleChange = val => {
    dispatch({
      type: 'searchPage/updateState',
      payload: {
        searchVal: val
      }
    })
  }

  const handleActionClick = () => {
    console.log('开始搜索')
    dispatch({
      type: 'searchPage/effectsSearch',
      payload: {}
    })
  }

  const handleClear = () => {
    dispatch({
      type: 'searchPage/updateState',
      payload: {
        searchVal: '',
        isSearch: false
      }
    })
  }

  const handleRecordClick = val => {
    dispatch({
      type: 'searchPage/updateState',
      payload: {
        searchVal: val,
        isSearch: true
      }
    })
  }

  const handleTabChange = value => {
    dispatch({
      type: 'searchPage/updateState',
      payload: {
        current: value
      }
    })
  }

  return (
    <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      <AtNavBar onClickLeftIcon={handleBack} title="搜索" leftIconType="chevron-left" />

      <AtSearchBar
        value={searchVal}
        onChange={handleChange}
        onActionClick={handleActionClick}
        onClear={handleClear}
      />

      {/* {!isSearch && (
        <Block>
          <View className="container__record">
            <View className="container__record__top">
              <View className="top__title">最近搜索</View>
              <View className="top__clear">清空记录</View>
            </View>
            <View className="container__record__data">
              {searchRecord.map(item => (
                <View className="data__item" onClick={() => handleRecordClick(item)}>
                  {item}
                </View>
              ))}
            </View>
          </View>

          <View className="container__record">
            <View className="container__record__top">
              <View className="top__title">热门搜索</View>
            </View>
            <View className="container__record__data">
              {hotRecord.map(item => (
                <View className="data__item" onClick={() => handleRecordClick(item)}>
                  {item}
                </View>
              ))}
            </View>
          </View>
        </Block>
      )} */}

      {isSearch && (
        <AtTabs current={current} tabList={tabList} onClick={handleTabChange}>
          <AtTabsPane current={current} index={0}>
            {companys.map(item => (
              <CompanyCard key={item.id} data={item} />
            ))}
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View className="tab__item tab__video">
              {products.map(item => (
                <View
                  key={item.id}
                  className="tab__item__card"
                  onClick={() => {
                    this.jumpTo('product-detail', `?id=${item.id}`)
                  }}
                >
                  <ProductCard card={item} />
                </View>
              ))}
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={2}>
            <View className="tab__item">
              {dynamics.map(item => (
                <View key={item.id} className="tab__item__comment">
                  <CommentCard
                    card={item}
                    handleShowAction={() => this.onShow(item)}
                    handleSharePopShow={this.handleSharePopShow}
                    handleZanClick={() => this.handleZanClick(item.id, item.isFabulous)}
                    isFabulous={item.isFabulous}
                  />
                </View>
              ))}
            </View>
          </AtTabsPane>
        </AtTabs>
      )}
    </View>
  )
}
export default connect(({ searchPage, loading, common }) => ({
  searchPage,
  loading,
  common
}))(SearchPage)
