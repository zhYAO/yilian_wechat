import Taro, { useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtNavBar, AtSearchBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import './index.less'

const SearchPage = props => {
  const {
    dispatch,
    searchPage: { searchVal, searchRecord, hotRecord },
    loading,
    common: { navBarPaddingTop }
  } = props

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
        searchVal: ''
      }
    })
  }

  const handleRecordClick = val => {
    dispatch({
      type: 'searchPage/updateState',
      payload: {
        searchVal: val
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
    </View>
  )
}
export default connect(({ searchPage, loading, common }) => ({
  searchPage,
  loading,
  common
}))(SearchPage)
