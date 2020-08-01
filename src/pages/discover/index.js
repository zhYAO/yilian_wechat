import Taro, { useEffect } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
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
    discover: { bannerList, current, tabList, jobList, videoList, comentCardList }
  } = props

  useEffect(() => {
    getPositionList()
    getVideoList()
  }, [])

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
                <CommentCard card={item} />
              </View>
            ))}
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  )
}
export default connect(({ common, discover }) => ({
  common,
  discover
}))(Discover)
