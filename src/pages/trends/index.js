import Taro, { useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtIcon, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { connect } from '@tarojs/redux'
import SearchPart from '@components/page-components/search-part'
import FocusCard from '@components/page-components/focus-card'
import CustomNavigator from '@components/page-components/custom-navigator'
import CommentCard from '@components/page-components/comment-card'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import SharePop from '@components/page-components/share-pop'
import './index.less'

const Trends = props => {
  const {
    dispatch,
    common: { navBarPaddingTop },
    trends: {
      focusCardsList,
      comentCardList,
      hasNextPage,
      pageSize,
      page,
      actionSheetOpen,
      isShareOpened
    }
  } = props

  useEffect(() => {
    getList()
  }, [])

  const handleClick = () => {
    navigateTo({
      url: `${pagejumplist['friend-list'].path}`
    })
  }

  const getList = () => {
    if (hasNextPage) {
      dispatch({
        type: 'trends/effectsDynamicList',
        payload: {
          pageSize,
          page
        }
      })
    }
  }
  const onShow = () => {
    dispatch({
      type: 'trends/updateState',
      payload: {
        actionSheetOpen: true
      }
    })
  }

  const onCancel = () => {
    dispatch({
      type: 'trends/updateState',
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
    <ScrollView
      className="container"
      style={{ paddingTop: navBarPaddingTop + 'px' }}
      onScrollToLower={getList}
      scrollY
    >
      {/* 头部搜索栏 */}
      <SearchPart>
        <AtIcon value="add-circle" size="20" color="#333" onClick={handleClick}></AtIcon>
      </SearchPart>

      {/* 推荐关注 */}
      <CustomNavigator title="推荐关注" extraText={'>>更多'} rightClick={handleClick} />
      <View>
        {focusCardsList.map(item => {
          return <FocusCard card={item} />
        })}
      </View>
      <View className="container__gap"></View>

      {/* 评论卡片 */}
      <View className="container__comment">
        {comentCardList.map(item => {
          return (
            <View className="container__comment__item">
              <CommentCard
                card={item}
                handleShowAction={onShow}
                handleSharePopShow={handleSharePopShow}
              />
            </View>
          )
        })}
      </View>

      <AtActionSheet
        isOpened={actionSheetOpen}
        cancelText="取消"
        onCancel={onCancel}
        onClose={onCancel}
      >
        <AtActionSheetItem>关注作者</AtActionSheetItem>
        <AtActionSheetItem>收藏动态</AtActionSheetItem>
        <AtActionSheetItem>举报</AtActionSheetItem>
      </AtActionSheet>

      <SharePop isOpened={isShareOpened} onClose={handleSharePopClose} />
    </ScrollView>
  )
}
export default connect(({ common, trends }) => ({
  common,
  trends
}))(Trends)
