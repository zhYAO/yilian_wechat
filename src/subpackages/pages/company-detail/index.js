import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNavBar, AtTabs, AtTabsPane, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import JobCard from '@components/page-components/job-card'
import VideoCard from '@components/page-components/video-card'
import CommentCard from '@components/page-components/comment-card'
import CompanyDetailInfo from '@components/page-components/company-detail-info'
import SharePop from '@components/page-components/share-pop'
import './index.less'

class CompanyDetail extends Taro.Component {
  constructor(props) {
    super(props)
    this.data = {}
  }

  componentWillMount() {
    const { id } = this.$router.params
    this.getCompanyDetail(id)
  }

  handleBack = () => {
    navigateBack()
  }

  handleClick = value => {
    const { dispatch } = this.props
    dispatch({
      type: 'companyDetail/updateState',
      payload: {
        current: value
      }
    })
  }

  getCompanyDetail = id => {
    const { dispatch } = this.props
    dispatch({
      type: 'companyDetail/effectsDetail',
      payload: {
        id
      }
    })
  }

  onShow = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'companyDetail/updateState',
      payload: {
        actionSheetOpen: true
      }
    })
  }

  onCancel = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'companyDetail/updateState',
      payload: {
        actionSheetOpen: false
      }
    })
  }

  handleSharePopShow = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'companyDetail/updateState',
      payload: {
        isShareOpened: true
      }
    })
  }

  handleSharePopClose = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'companyDetail/updateState',
      payload: {
        isShareOpened: false
      }
    })
  }

  handleZanClick = (foreignId, isFabulous) => {
    if(!isFabulous) {
      dispatch({
        type: 'trends/effectsfabulous',
        payload: {
          foreignId,
          type: 'USER'
        }
      })
    } else {
      dispatch({
        type: 'trends/effectsfabulousRemove',
        payload: {
          foreignId,
          type: 'USER'
        }
      })
    }
  }

  render() {
    const {
      common: { navBarPaddingTop },
      companyDetail: {
        current,
        tabList,
        companyDetail,
        customerList,
        dynamicList,
        positionList,
        productList,
        actionSheetOpen,
        isShareOpened
      },
      loading
    } = this.props

    return (
      <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
        <AtNavBar
          onClickLeftIcon={this.handleBack}
          title={companyDetail.name}
          leftIconType="chevron-left"
        />

        <View className="container__user">
          <Image
            className="container__user__bg"
            src={require('@static/images/common/bg.png')}
            mode="aspectFit"
          />
          <View className="container__user__info">
            <Image className="info__aventor" src={companyDetail.logoPath}></Image>
            <View className="info__name">{companyDetail.name}</View>
            <View className="info__score">{companyDetail.profile}</View>
            <View className="info__labels">
              {companyDetail.labels.map((item, index) => {
                return index < 3 ? (
                  <View key={index} className="info__labels__item">
                    {item}
                  </View>
                ) : null
              })}
            </View>
            <View className="info__area">{companyDetail.address}</View>
          </View>
        </View>

        {/* tab */}
        <AtTabs current={current} tabList={tabList} onClick={this.handleClick}>
          <AtTabsPane current={current} index={0}>
            <CompanyDetailInfo companyDetail={companyDetail} customerList={customerList} />
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View className="tab__item tab__video">
              {productList.map(item => (
                <View key={item.id} className="tab__item__card">
                  <VideoCard card={item} />
                </View>
              ))}
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={2}>
            <View className="tab__item">
              {positionList.map(item => (
                <JobCard key={item.id} card={item} />
              ))}
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={3}>
            <View className="tab__item">
              {dynamicList.map(item => (
                <View key={item.id} className="tab__item__comment">
                  <CommentCard
                    card={item}
                    handleShowAction={this.onShow}
                    handleSharePopShow={this.handleSharePopShow}
                    handleZanClick={() => this.handleZanClick(item.foreignId, item.isFabulous)}
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
          onCancel={this.onCancel}
          onClose={this.onCancel}
        >
          <AtActionSheetItem>关注作者</AtActionSheetItem>
          <AtActionSheetItem>收藏动态</AtActionSheetItem>
          <AtActionSheetItem>举报</AtActionSheetItem>
        </AtActionSheet>

        <SharePop isOpened={isShareOpened} onClose={this.handleSharePopClose} />
      </View>
    )
  }
}

export default connect(({ common, companyDetail, loading }) => ({
  common,
  companyDetail,
  loading
}))(CompanyDetail)
