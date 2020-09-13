import Taro, { useDidShow, useState, useReachBottom, useShareAppMessage } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import { AtTabs, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { connect } from '@tarojs/redux'
import SearchPart from '@components/page-components/search-part'
import JobCard from '@components/page-components/job-card'
import VideoCard from '@components/page-components/video-card'
import CommentCard from '@components/page-components/comment-card'
import './index.less'

const Discover = props => {
  const {
    dispatch,
    discover: {
      bannerList,
      current,
      tabList,
      jobList,
      videoList,
      comentCardList,
      actionSheetOpen,
      hasNextPage,
      pageSize,
      page
    }
  } = props

  useDidShow(() => {
    getData()
  }, [])

  useReachBottom(() => {
    switch (current) {
      case 0:
        getPositionList()
        break
      case 1:
        getVideoList()
        break
      case 2:
        getActivityList()
        break
    }
  })

  useShareAppMessage(res => {
    const {
      target: {
        dataset: { detail = {}, value = '' }
      }
    } = res
    return {
      title: value || detail.publisher,
      path: `subpackages/pages/edit-comment/index?id=${detail.id}`
    }
  })

  const [itemActive, setItemActive] = useState({})

  const getData = async () => {
    await getPositionList(true)
    await getVideoList(true)
    await getActivityList(true)
  }

  const handleClick = value => {
    dispatch({
      type: 'discover/updateState',
      payload: {
        current: value
      }
    })
  }

  const getPositionList = (isReset = false) => {
    return new Promise(resolve => {
      if (hasNextPage[0] || isReset) {
        dispatch({
          type: 'discover/effectsPositionList',
          payload: {
            pageSize: pageSize[0],
            page: page[0],
            isReset
          }
        }).then(() => {
          resolve()
        })
      } else {
        resolve()
      }
    })
  }

  const getVideoList = (isReset = false) => {
    return new Promise(resolve => {
      if (hasNextPage[1] || isReset) {
        dispatch({
          type: 'discover/effectsVideoList',
          payload: {
            pageSize: pageSize[1],
            page: page[1],
            isReset
          }
        }).then(() => {
          resolve()
        })
      } else {
        resolve()
      }
    })
  }

  const getActivityList = (isReset = false) => {
    return new Promise(resolve => {
      if (hasNextPage[2] || isReset) {
        dispatch({
          type: 'discover/effectsActivityList',
          payload: {
            pageSize: pageSize[2],
            page: page[2],
            isReset
          }
        }).then(() => {
          resolve()
        })
      } else {
        resolve()
      }
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
        getData()
      })
    } else {
      dispatch({
        type: 'discover/effectsfabulousRemove',
        payload: {
          foreignId,
          type: 5
        }
      }).then(() => {
        getData()
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
        getData()
      })
    } else {
      dispatch({
        type: 'discover/effectsAttentionRemove',
        payload: {
          foreignId,
          type: type === 'USER' ? 1 : 2
        }
      }).then(() => {
        getData()
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
        getData()
      })
    } else {
      dispatch({
        type: 'discover/effectsfavoriteRemove',
        payload: {
          foreignId: id,
          type: 5
        }
      }).then(() => {
        getData()
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

  return (
    <View className="container">
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
      <AtTabs current={current} tabList={tabList} onClick={handleClick}></AtTabs>

      {current === 0 && (
        <View className="tab__item">
          {jobList.map(item => (
            <JobCard key={item.id} card={item} />
          ))}
        </View>
      )}

      {current === 1 && (
        <View className="tab__item tab__video">
          {videoList.map(item => (
            <View key={item.id} className="tab__item__card">
              <VideoCard card={item} />
            </View>
          ))}
        </View>
      )}

      {current === 2 && (
        <View className="tab__item">
          {comentCardList.map(item => (
            <View key={item.id} className="tab__item__comment">
              <CommentCard
                card={item}
                handleShowAction={() => onShow(item)}
                handleZanClick={() => handleZanClick(item.id, item.isFabulous)}
                isFabulous={item.isFabulous}
              />
            </View>
          ))}
        </View>
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
    </View>
  )
}
export default connect(({ common, discover }) => ({
  common,
  discover
}))(Discover)
