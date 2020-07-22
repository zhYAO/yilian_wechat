import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNavBar, AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import JobCard from '@components/page-components/job-card'
import VideoCard from '@components/page-components/video-card'
import CommentCard from '@components/page-components/comment-card'
import CompanyDetailInfo from '@components/page-components/company-detail-info'
import './index.less'

const CompanyDetail = props => {
  const {
    dispatch,
    common: {
      navBarPaddingTop,
      userInfo: { nickname, userAventor }
    },
    companyDetail: { current, tabList, jobList, videoList, comentCardList },
    loading
  } = props

  const handleBack = () => {
    navigateBack()
  }

  const handleClick = value => {
    dispatch({
      type: 'companyDetail/updateState',
      payload: {
        current: value
      }
    })
  }

  return (
    <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      <AtNavBar onClickLeftIcon={handleBack} title="有限公司" leftIconType="chevron-left" />

      <View className="container__user">
        <View className="container__user__info">
          <Image
            className="info__aventor"
            src={
              userAventor ||
              'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180'
            }
          ></Image>
          <View className="info__name">{nickname || '没得法士大夫'}</View>
          <View className="info__score">专注于计算机视觉和深度学习原创技术研究</View>
          <View className="info__labels">
            <View className="info__labels__item">图像</View>
            <View className="info__labels__item">大数据</View>
            <View className="info__labels__item">机器人</View>
          </View>
          <View className="info__area">北京 2014</View>
        </View>
      </View>

      {/* tab */}
      <AtTabs current={current} tabList={tabList} onClick={handleClick}>
        <AtTabsPane current={current} index={0}>
          <CompanyDetailInfo />
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View className="tab__item">
            {jobList.map(item => (
              <JobCard key={item.id} card={item} />
            ))}
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <View className="tab__item tab__video">
            {videoList.map(item => (
              <View key={item.id} className="tab__item__card">
                <VideoCard card={item} />
              </View>
            ))}
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={3}>
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

export default connect(({ common, companyDetail, loading }) => ({
  common,
  companyDetail,
  loading
}))(CompanyDetail)
