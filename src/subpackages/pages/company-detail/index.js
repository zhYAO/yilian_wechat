import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNavBar, AtTabs, AtTabsPane, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack, navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import JobCard from '@components/page-components/job-card'
import ProductCard from '@components/page-components/product-card'
import CommentCard from '@components/page-components/comment-card'
import CompanyDetailInfo from '@components/page-components/company-detail-info'
import SharePop from '@components/page-components/share-pop'
import { makePhoneCall } from '@crossplatform/apiservice/makephonecall'
import './index.less'

class CompanyDetail extends Taro.Component {
  constructor(props) {
    super(props)
    this.data = {
      itemActive: {}
    }
  }

  componentWillMount() {
    this.getCompanyDetail()
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

  getCompanyDetail = () => {
    const { id } = this.$router.params
    const { dispatch } = this.props
    dispatch({
      type: 'companyDetail/effectsDetail',
      payload: {
        id
      }
    })
  }

  onShow = item => {
    const { dispatch } = this.props
    dispatch({
      type: 'companyDetail/updateState',
      payload: {
        actionSheetOpen: true
      }
    })
    this.setState({
      itemActive: item
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
    const { dispatch } = this.props
    if (!isFabulous) {
      dispatch({
        type: 'companyDetail/effectsfabulous',
        payload: {
          foreignId,
          type: 5
        }
      }).then(() => {
        this.getCompanyDetail()
      })
    } else {
      dispatch({
        type: 'companyDetail/effectsfabulousRemove',
        payload: {
          foreignId,
          type: 5
        }
      }).then(() => {
        this.getCompanyDetail()
      })
    }
    this.onCancel()
  }

  handleCompanyAttention = (type = 2, isAttention) => {
    const { id } = this.$router.params
    const { dispatch } = this.props
    if (!isAttention) {
      dispatch({
        type: 'companyDetail/effectsAttention',
        payload: {
          foreignId: id,
          type
        }
      }).then(() => {
        this.getCompanyDetail()
      })
    } else {
      dispatch({
        type: 'companyDetail/effectsAttentionRemove',
        payload: {
          foreignId: id,
          type
        }
      }).then(() => {
        this.getCompanyDetail()
      })
    }
    this.onCancel()
  }

  handleFavoriteClick = () => {
    const { isFavorite, id } = this.state.itemActive
    const { dispatch } = this.props
    if (!isFavorite) {
      dispatch({
        type: 'companyDetail/effectsfavorite',
        payload: {
          foreignId: id,
          type: 5
        }
      }).then(() => {
        this.getCompanyDetail()
      })
    } else {
      dispatch({
        type: 'companyDetail/effectsfavoriteRemove',
        payload: {
          foreignId: id,
          type: 5
        }
      }).then(() => {
        this.getCompanyDetail()
      })
    }
    this.onCancel()
  }

  jumpTo = (url, params) => {
    navigateTo({
      url: `${pagejumplist[url].path}${params}`
    })
  }

  makePhoneCall = () => {
    const {
      companyDetail: {
        companyDetail: { telephone }
      }
    } = this.props
    makePhoneCall({ phoneNumber: telephone })
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
    const { isMine } = this.$router.params
    const { itemActive } = this.state

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
            <View className="info__score">{companyDetail.theme}</View>
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
            <CompanyDetailInfo
              companyDetail={companyDetail}
              customerList={customerList}
              handleAttentionClick={() => this.handleCompanyAttention(2, companyDetail.isAttention)}
              handlePhoneCall={this.makePhoneCall}
              isMine={isMine}
            />
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View className="tab__item tab__video">
              {productList.map(item => (
                <View
                  key={item.id}
                  className="tab__item__card"
                  onClick={() => {
                    this.jumpTo('product-detail', `?id=${item.id}`)
                  }}
                >
                  <ProductCard card={item} />
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
                    handleShowAction={() => this.onShow(item)}
                    handleSharePopShow={this.handleSharePopShow}
                    handleZanClick={() => this.handleZanClick(item.id, item.isFabulous)}
                    isFabulous={item.isFabulous}
                  />
                </View>
              ))}
            </View>
            {isMine && (
              <View
                className="tab__send"
                onClick={() => this.jumpTo('publish-dynamic', `?type=COMPANY`)}
              >
                <View className="tab__send__btn">发动态</View>
              </View>
            )}
          </AtTabsPane>
        </AtTabs>

        <AtActionSheet
          isOpened={actionSheetOpen}
          cancelText="取消"
          onCancel={this.onCancel}
          onClose={this.onCancel}
        >
          <AtActionSheetItem onClick={() => this.handleCompanyAttention(1, itemActive.isAttention)}>
            {itemActive.isAttention ? '取消关注' : '关注作者'}
          </AtActionSheetItem>
          <AtActionSheetItem onClick={this.handleFavoriteClick}>
            {itemActive.isFavorite ? '取消收藏' : '收藏动态'}
          </AtActionSheetItem>
          {/* <AtActionSheetItem>举报</AtActionSheetItem> */}
        </AtActionSheet>

        {/* <SharePop isOpened={isShareOpened} onClose={this.handleSharePopClose} /> */}
      </View>
    )
  }
}

export default connect(({ common, companyDetail, loading }) => ({
  common,
  companyDetail,
  loading
}))(CompanyDetail)
