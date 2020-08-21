import Taro, { useEffect, useState } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import {
  AtNavBar,
  AtTabs,
  AtTabsPane,
  AtSearchBar,
  AtActionSheet,
  AtActionSheetItem
} from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack, navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import CompanyCard from '@components/page-components/company-card'
import ProductCard from '@components/page-components/product-card'
import CommentCard from '@components/page-components/comment-card'
import JobCard from '@components/page-components/job-card'
import SharePop from '@components/page-components/share-pop'
import './index.less'

const SearchPage = props => {
  const {
    dispatch,
    searchPage: {
      searchVal,
      searchRecord,
      hotRecord,
      isSearch,
      searchData: { companys, dynamics, products, positions },
      current,
      tabList,
      actionSheetOpen
    },
    loading,
    common: { navBarPaddingTop }
  } = props

  const [itemActive, setItemActive] = useState({})

  useEffect(() => {
    dispatch({
      type: 'searchPage/updateState',
      payload: {
        current: 0,
        searchVal: '',
        searchData: {},
        isSearch: false
      }
    })
  }, [])

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

  const handleZanClick = (foreignId, isFabulous) => {
    if (!isFabulous) {
      dispatch({
        type: 'searchPage/effectsfabulous',
        payload: {
          foreignId,
          type: 5
        }
      }).then(() => {
        handleActionClick()
      })
    } else {
      dispatch({
        type: 'searchPage/effectsfabulousRemove',
        payload: {
          foreignId,
          type: 5
        }
      }).then(() => {
        handleActionClick()
      })
    }
  }

  const handleAttentionClick = () => {
    const { isAttention, foreignId, type } = itemActive
    if (!isAttention) {
      dispatch({
        type: 'searchPage/effectsAttention',
        payload: {
          foreignId,
          type: type === 'USER' ? 1 : 2
        }
      }).then(() => {
        handleActionClick()
      })
    } else {
      dispatch({
        type: 'searchPage/effectsAttentionRemove',
        payload: {
          foreignId,
          type: type === 'USER' ? 1 : 2
        }
      }).then(() => {
        handleActionClick()
      })
    }
    onCancel()
  }

  const handleFavoriteClick = () => {
    const { isFavorite, id } = itemActive
    if (!isFavorite) {
      dispatch({
        type: 'searchPage/effectsfavorite',
        payload: {
          foreignId: id,
          type: 5
        }
      }).then(() => {
        handleActionClick()
      })
    } else {
      dispatch({
        type: 'searchPage/effectsfavoriteRemove',
        payload: {
          foreignId: id,
          type: 5
        }
      }).then(() => {
        handleActionClick()
      })
    }
    onCancel()
  }

  const jumpTo = (url, params) => {
    navigateTo({
      url: `${pagejumplist[url].path}${params}`
    })
  }

  const onShow = item => {
    setItemActive(item)
    dispatch({
      type: 'searchPage/updateState',
      payload: {
        actionSheetOpen: true
      }
    })
  }

  const onCancel = () => {
    dispatch({
      type: 'searchPage/updateState',
      payload: {
        actionSheetOpen: false
      }
    })
  }

  const handleSharePopShow = () => {
    dispatch({
      type: 'trends/updateState',
      payload: {
        isShareOpened: true
      }
    })
  }

  const handleSharePopClose = () => {
    dispatch({
      type: 'trends/updateState',
      payload: {
        isShareOpened: false
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
        focus={true}
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
                    jumpTo('product-detail', `?id=${item.id}`)
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
                    handleShowAction={() => onShow(item)}
                    handleSharePopShow={handleSharePopShow}
                    handleZanClick={() => handleZanClick(item.id, item.isFabulous)}
                    isFabulous={item.isFabulous}
                  />
                </View>
              ))}
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={3}>
            <View className="tab__item">
              {positions.map(item => (
                <JobCard key={item.id} card={item} />
              ))}
            </View>
          </AtTabsPane>
        </AtTabs>
      )}

      <AtActionSheet
        isOpened={actionSheetOpen}
        cancelText="取消"
        onCancel={onCancel}
        onClose={onCancel}
      >
        <AtActionSheetItem onClick={handleAttentionClick}>
          {itemActive.isAttention
            ? '取消关注'
            : `关注${itemActive.type === 'USER' ? '作者' : '公司'}`}
        </AtActionSheetItem>
        <AtActionSheetItem onClick={handleFavoriteClick}>
          {itemActive.isFavorite ? '取消收藏' : '收藏动态'}
        </AtActionSheetItem>
        {/* <AtActionSheetItem>举报</AtActionSheetItem> */}
      </AtActionSheet>

      {/* <SharePop isOpened={isShareOpened} onClose={handleSharePopClose} /> */}
    </View>
  )
}
export default connect(({ searchPage, loading, common }) => ({
  searchPage,
  loading,
  common
}))(SearchPage)
