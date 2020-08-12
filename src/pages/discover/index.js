import Taro, { useDidShow, useState } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { connect } from '@tarojs/redux'
import SearchPart from '@components/page-components/search-part'
import JobCard from '@components/page-components/job-card'
import VideoCard from '@components/page-components/video-card'
import CommentCard from '@components/page-components/comment-card'
import './index.less'

const Discover = props => {
  const {
    dispatch,
    common: { navBarPaddingTop },
    discover: { bannerList, current, tabList, jobList, videoList, comentCardList, actionSheetOpen }
  } = props

  useDidShow(() => {
    getData()
  }, [])

  const [itemActive, setItemActive] = useState({})

  const getData = () => {
    getPositionList()
    getVideoList()
    getActivityList()
  }

  const handleClick = value => {
    dispatch({
      type: 'discover/updateState',
      payload: {
        current: value
      }
    })
  }

  const getPositionList = () => {
    dispatch({
      type: 'discover/effectsPositionList',
      payload: {}
    })
  }

  const getVideoList = () => {
    dispatch({
      type: 'discover/effectsVideoList',
      payload: {}
    })
  }

  const getActivityList = () => {
    dispatch({
      type: 'discover/effectsActivityList',
      payload: {}
    })
  }

  const handleZanClick = (foreignId, isFabulous) => {
    if (!isFabulous) {
      dispatch({
        type: 'discover/effectsfabulous',
        payload: {
          foreignId,
          type: 5
        }
      }).then(() => {
        getActivityList()
      })
    } else {
      dispatch({
        type: 'discover/effectsfabulousRemove',
        payload: {
          foreignId,
          type: 5
        }
      }).then(() => {
        getActivityList()
      })
    }
  }

  const handleAttentionClick = () => {
    const { isAttention, foreignId, type } = itemActive
    if (!isAttention) {
      dispatch({
        type: 'discover/effectsAttention',
        payload: {
          foreignId,
          type: type === 'USER' ? 1 : 2
        }
      }).then(() => {
        getActivityList()
      })
    } else {
      dispatch({
        type: 'discover/effectsAttentionRemove',
        payload: {
          foreignId,
          type: type === 'USER' ? 1 : 2
        }
      }).then(() => {
        getActivityList()
      })
    }
    onCancel()
  }

  const handleFavoriteClick = () => {
    const { isFavorite, id } = itemActive
    if (!isFavorite) {
      dispatch({
        type: 'discover/effectsfavorite',
        payload: {
          foreignId: id,
          type: 5
        }
      }).then(() => {
        getActivityList()
      })
    } else {
      dispatch({
        type: 'discover/effectsfavoriteRemove',
        payload: {
          foreignId: id,
          type: 5
        }
      }).then(() => {
        getActivityList()
      })
    }
    onCancel()
  }

  const onShow = item => {
    setItemActive(item)
    dispatch({
      type: 'discover/updateState',
      payload: {
        actionSheetOpen: true
      }
    })
  }

  const onCancel = () => {
    dispatch({
      type: 'discover/updateState',
      payload: {
        actionSheetOpen: false
      }
    })
  }

  const handleSharePopShow = () => {
    dispatch({
      type: 'discover/updateState',
      payload: {
        isShareOpened: true
      }
    })
  }

  const handleSharePopClose = () => {
    dispatch({
      type: 'discover/updateState',
      payload: {
        isShareOpened: false
      }
    })
  }

  return (
    <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      {/* 头部搜索栏 */}
      <SearchPart></SearchPart>

      {/* banner */}
      <Swiper className="banner" circular>
        {bannerList.map(item => {
          return (
            <SwiperItem className="banner__item" key={item.id}>
              <Image
                className="banner__item__img"
                src={item.picUrl}
                mode="widthFix"
                onClick={() => handleImgJump(item.url)}
              />
            </SwiperItem>
          )
        })}
      </Swiper>

      {/* tab */}
      <AtTabs current={current} tabList={tabList} onClick={handleClick}>
        <AtTabsPane current={current} index={0}>
          <View className="tab__item">
            {jobList.map(item => (
              <JobCard key={item.id} card={item} />
            ))}
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View className="tab__item tab__video">
            {videoList.map(item => (
              <View key={item.id} className="tab__item__card">
                <VideoCard card={item} />
              </View>
            ))}
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <View className="tab__item">
            {comentCardList.map(item => (
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
      </AtTabs>

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
export default connect(({ common, discover }) => ({
  common,
  discover
}))(Discover)
