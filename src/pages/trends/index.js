import Taro, {
  useDidShow,
  useState,
  useReachBottom,
  usePullDownRefresh,
  useShareAppMessage
} from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { connect } from '@tarojs/redux'
import SearchPart from '@components/page-components/search-part'
import FocusCard from '@components/page-components/focus-card'
import CustomNavigator from '@components/page-components/custom-navigator'
import CommentCard from '@components/page-components/comment-card'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import SharePop from '@components/page-components/share-pop'
import { stopPullDownRefresh } from '@crossplatform/apiservice/reflash'
import './index.less'

let shareText = ''
let cardDetail = {}

const Trends = props => {
  const {
    dispatch,
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
    getInitData()
  }, [])

  usePullDownRefresh(() => {
    getInitData().then(() => {
      stopPullDownRefresh()
    })
  })

  useReachBottom(() => {
    getList()
  })

  useShareAppMessage(res => {
    return {
      title: shareText || cardDetail.content,
      path: `subpackages/pages/edit-comment/index?id=${cardDetail.id}`
    }
  })

  // 获取初始化数据
  const getInitData = () => {
    return Promise.all([getList(true), getRecommendAttention()])
  }

  const handleClick = () => {
    navigateTo({
      url: `${pagejumplist['friend-list'].path}`
    })
  }

  const getList = (isReset = false) => {
    return new Promise(resolve => {
      if (hasNextPage || isReset) {
        dispatch({
          type: 'trends/effectsDynamicList',
          payload: {
            pageSize,
            page,
            isReset
          }
        }).then(() => {
          resolve()
        })
      }
      resolve()
    })
  }

  const getRecommendAttention = () => {
    return new Promise(resolve => {
      dispatch({
        type: 'trends/effectsRecommendAttention',
        payload: {}
      }).then(() => {
        resolve()
      })
    })
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
        getInitData()
      })
    } else {
      dispatch({
        type: 'trends/effectsfabulousRemove',
        payload: {
          foreignId,
          type: 5
        }
      }).then(() => {
        getInitData()
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
        getInitData()
      })
    } else {
      dispatch({
        type: 'trends/effectsAttentionRemove',
        payload: {
          foreignId,
          type: type === 'USER' ? 1 : 2
        }
      }).then(() => {
        getInitData()
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
        getInitData()
      })
    } else {
      dispatch({
        type: 'trends/effectsfavoriteRemove',
        payload: {
          foreignId: id,
          type: 5
        }
      }).then(() => {
        getInitData()
      })
    }
    onCancel()
  }

  const handleShareTextChange = (val, detail) => {
    shareText = val
    cardDetail = detail
  }

  return (
    <View className="container">
      {/* 头部搜索栏 */}
      <SearchPart>
        <AtIcon value="add-circle" size="20" color="#333" onClick={handleClick}></AtIcon>
      </SearchPart>

      {/* 推荐关注 */}
      <CustomNavigator title="推荐关注" extraText={'>>更多'} rightClick={handleClick} />
      <View>
        {focusCardsList.map((item, index) => {
          if (index < 3) {
            return (
              <View key={item.id}>
                <FocusCard card={item} handleInit={() => getList(true)} />
              </View>
            )
          }
        })}
      </View>
      <View className="container__gap"></View>

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
                onShareTextChange={handleShareTextChange}
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
          {itemActive.isAttention
            ? '取消关注'
            : `关注${itemActive.type === 'USER' ? '作者' : '公司'}`}
        </AtActionSheetItem>
        <AtActionSheetItem onClick={handleFavoriteClick}>
          {itemActive.isFavorite ? '取消收藏' : '收藏动态'}
        </AtActionSheetItem>
        {/* <AtActionSheetItem>举报</AtActionSheetItem> */}
      </AtActionSheet>

      <SharePop isOpened={isShareOpened} onClose={handleSharePopClose} />
    </View>
  )
}

Trends.config = {
  enablePullDownRefresh: true
}

export default connect(({ common, trends }) => ({
  common,
  trends
}))(Trends)
