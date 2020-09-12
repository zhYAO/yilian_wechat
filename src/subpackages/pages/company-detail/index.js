import Taro from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import { AtTabs, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack, navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import JobCard from '@components/page-components/job-card'
import ProductCard from '@components/page-components/product-card'
import CommentCard from '@components/page-components/comment-card'
import CompanyDetailInfo from '@components/page-components/company-detail-info'
import { makePhoneCall } from '@crossplatform/apiservice/makephonecall'
import NavigationBar from '@components/page-components/navigation-bar'
import SharePop from '@components/page-components/share-pop'
import './index.less'

let shareText = ''

class CompanyDetail extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemActive: {},
      isFullScreen: false
    }
  }

  componentDidShow() {
    this.getCompanyDetail()
  }

  componentDidHide() {
    this.handleClearData()
  }

  componentWillUnmount() {
    this.handleClearData()
  }

  onShareAppMessage(e) {
    const { id } = this.$router.params
    const {
      companyDetail: { companyDetail }
    } = this.props
    const {
      target: { dataset = {} }
    } = e
    if (dataset.type === 'COMAPNY') {
      return {
        title: shareText || companyDetail.name,
        path: `/subpackages/pages/company-detail/index?id=${id}`
      }
    } else {
      const { itemActive } = this.state
      return {
        title: shareText || itemActive.publisher,
        path: `subpackages/pages/edit-comment/index?id=${itemActive.id}`
      }
    }
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

  handleClearData = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'companyDetail/updateState',
      payload: {
        current: 0,
        companyDetail: {},
        customerList: [],
        dynamicList: [],
        positionList: [],
        productList: [],
        actionSheetOpen: false,
        isShareOpened: false
      }
    })
  }

  handleFullScreen() {
    const { isFullScreen } = this.state
    this.setState({
      isFullScreen: !isFullScreen
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

  handleSharePopShow = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'companyDetail/updateState',
      payload: {
        isShareOpened: true
      }
    })
  }

  handleSharePopChange = val => {
    shareText = val
  }

  render() {
    const {
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
    const { itemActive, isFullScreen } = this.state

    return (
      <View className="container">
        {!isFullScreen && <NavigationBar title={companyDetail.name} hasLeftIcon={true} />}

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
            <View className="info__area">{`${companyDetail.address} ${companyDetail.registerTime}`}</View>
          </View>
        </View>

        {/* tab */}
        <AtTabs current={current} tabList={tabList} onClick={this.handleClick}></AtTabs>

        {current === 0 && (
          <CompanyDetailInfo
            companyDetail={companyDetail}
            customerList={customerList}
            handleFullScreen={this.handleFullScreen}
          />
        )}

        {current === 1 && (
          <View className="tab__item">
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
          </View>
        )}

        {current === 2 && (
          <View className="tab__item">
            {positionList.map(item => (
              <JobCard key={item.id} card={item} />
            ))}
          </View>
        )}

        {current === 3 && (
          <Block>
            <View className="tab__item">
              {dynamicList.map(item => (
                <View key={item.id} className="tab__item__comment">
                  <CommentCard
                    card={item}
                    handleShowAction={() => this.onShow(item)}
                    handleZanClick={() => this.handleZanClick(item.id, item.isFabulous)}
                    isFabulous={item.isFabulous}
                    onShareTextChange={this.handleSharePopChange}
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
          </Block>
        )}

        {!isMine && !isFullScreen && (
          <View className="container__bottom">
            <Image
              className="container__bottom__img"
              src={require('@static/images/common/share__active.png')}
              onClick={this.handleSharePopShow}
            />
            <View className="container__bottom__btn">
              <View className="btn" onClick={this.makePhoneCall}>
                极速沟通
              </View>
              <View
                className="btn"
                onClick={() => this.handleCompanyAttention(2, companyDetail.isAttention)}
              >
                {companyDetail.isAttention ? '已关注' : '+ 关注'}
              </View>
            </View>
          </View>
        )}

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

        <SharePop
          isOpened={isShareOpened}
          onClose={this.handleSharePopClose}
          onTextChange={this.handleSharePopChange}
          type={'COMPANY'}
          detail={companyDetail}
        />
      </View>
    )
  }
}

export default connect(({ common, companyDetail, loading }) => ({
  common,
  companyDetail,
  loading
}))(CompanyDetail)
