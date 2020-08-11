import Taro, { useDidShow, useState, usePullDownRefresh } from '@tarojs/taro'
import { View, ScrollView, Block } from '@tarojs/components'
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

  const [itemActive, setItemActive] = useState({})

  useDidShow(() => {
    getList(true)
  }, [])

  const handleClick = () => {
    navigateTo({
      url: `${pagejumplist['friend-list'].path}`
    })
  }

  const getList = (isReset = false) => {
    if (hasNextPage) {
      dispatch({
        type: 'trends/effectsDynamicList',
        payload: {
          pageSize,
          page,
          isReset
        }
      })
    }
  }

  const onShow = item => {
    setItemActive(item)
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

  const handleZanClick = (foreignId, isFabulous) => {
    if (!isFabulous) {
      dispatch({
        type: 'trends/effectsfabulous',
        payload: {
          foreignId,
          type: 5
        }
      }).then(() => {
        getList(true)
      })
    } else {
      dispatch({
        type: 'trends/effectsfabulousRemove',
        payload: {
          foreignId,
          type: 5
        }
      }).then(() => {
        getList(true)
      })
    }
  }

  const handleAttentionClick = () => {
    const { isAttention, foreignId, type } = itemActive
    if (!isAttention) {
      dispatch({
        type: 'trends/effectsAttention',
        payload: {
          foreignId,
          type: type === 'USER' ? 1 : 2
        }
      }).then(() => {
        getList(true)
      })
    } else {
      dispatch({
        type: 'trends/effectsAttentionRemove',
        payload: {
          foreignId,
          type: type === 'USER' ? 1 : 2
        }
      }).then(() => {
        getList(true)
      })
    }
    onCancel()
  }

  const handleFavoriteClick = () => {
    const { isFavorite, id } = itemActive
    if (!isFavorite) {
      dispatch({
        type: 'trends/effectsfavorite',
        payload: {
          foreignId: id,
          type: 5
        }
      }).then(() => {
        getList(true)
      })
    } else {
      dispatch({
        type: 'trends/effectsfavoriteRemove',
        payload: {
          foreignId: id,
          type: 5
        }
      }).then(() => {
        getList(true)
      })
    }
    onCancel()
  }

  return (
    <ScrollView
      className="container"
      style={{ paddingTop: navBarPaddingTop + 'px' }}
      onScrollToLower={() => getList()}
      scrollY
    >
      {/* 头部搜索栏 */}
      <SearchPart>
        <AtIcon value="add-circle" size="20" color="#333" onClick={handleClick}></AtIcon>
      </SearchPart>

      {/* 推荐关注 */}
      {focusCardsList && focusCardsList.length > 0 && (
        <Block>
          <CustomNavigator title="推荐关注" extraText={'>>更多'} rightClick={handleClick} />
          <View>
            {focusCardsList.map(item => {
              return <FocusCard card={item} />
            })}
          </View>
          <View className="container__gap"></View>
        </Block>
      )}

      {/* 评论卡片 */}
      <View className="container__comment">
        {comentCardList.map(item => {
          return (
            <View className="container__comment__item" key={item.id}>
              <CommentCard
                card={item}
                handleShowAction={() => onShow(item)}
                handleSharePopShow={handleSharePopShow}
                handleZanClick={() => handleZanClick(item.id, item.isFabulous)}
                isFabulous={item.isFabulous}
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
        <AtActionSheetItem onClick={handleAttentionClick}>
          {itemActive.isAttention ? '取消关注' : `关注${itemActive.type === 'USER' ? '作者' : '公司'}`}
        </AtActionSheetItem>
        <AtActionSheetItem onClick={handleFavoriteClick}>
          {itemActive.isFavorite ? '取消收藏' : '收藏动态'}
        </AtActionSheetItem>
        {/* <AtActionSheetItem>举报</AtActionSheetItem> */}
      </AtActionSheet>

      {/* <SharePop isOpened={isShareOpened} onClose={handleSharePopClose} /> */}
    </ScrollView>
  )
}
export default connect(({ common, trends }) => ({
  common,
  trends
}))(Trends)
