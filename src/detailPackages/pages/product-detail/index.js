import Taro from '@tarojs/taro'
import { View, Image, Video, RichText, Swiper, SwiperItem } from '@tarojs/components'
import { AtModalHeader, AtModalContent, AtModalAction, AtModal, AtInput } from 'taro-ui'
import { connect } from '@tarojs/redux'
import CustomNavigator from '@components/page-components/custom-navigator'
import CommonOptions from '@components/page-components/common-options'
import NavigationBar from '@components/page-components/navigation-bar'
import { getGlobalData } from '@configuration/globaldata'
import './index.less'

const { isFullScreen: isFullScreenBottom } = getGlobalData()

class ProductDetail extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFullScreen: false
    }
  }

  componentDidMount() {
    this.getData()
  }

  onShareAppMessage(res) {
    const { id } = this.$router.params
    const {
      productDetail: { detail }
    } = this.props
    const {
      target: {
        dataset: { value = '' }
      }
    } = res
    return {
      title: value || detail.name,
      path: `/detailPackages/pages/product-detail/index?id=${id}`
    }
  }

  getData() {
    const { dispatch } = this.props
    const { id } = this.$router.params

    dispatch({
      type: 'productDetail/effectsDetail',
      payload: { id }
    })
  }

  handleZanClick = (foreignId, isFabulous) => {
    const { dispatch } = this.props
    if (!isFabulous) {
      dispatch({
        type: 'productDetail/effectsfabulous',
        payload: {
          foreignId,
          type: 4
        }
      }).then(() => {
        this.getData()
      })
    } else {
      dispatch({
        type: 'productDetail/effectsfabulousRemove',
        payload: {
          foreignId,
          type: 4
        }
      }).then(() => {
        this.getData()
      })
    }
  }

  handleFavoriteClick = (foreignId, isFavorite) => {
    const { dispatch } = this.props
    if (!isFavorite) {
      dispatch({
        type: 'productDetail/effectsfavorite',
        payload: {
          foreignId,
          type: 4
        }
      }).then(() => {
        this.getData()
      })
    } else {
      dispatch({
        type: 'productDetail/effectsfavoriteRemove',
        payload: {
          foreignId,
          type: 4
        }
      }).then(() => {
        this.getData()
      })
    }
  }

  editComment({ commentId, commentUserId, commentUserName }) {
    const {
      dispatch,
      productDetail: { detail }
    } = this.props
    if (commentId) {
      dispatch({
        type: 'productDetail/updateState',
        payload: {
          isOpened: true,
          replyName: commentUserName,
          replyId: commentUserId,
          commentId
        }
      })
    } else {
      dispatch({
        type: 'productDetail/updateState',
        payload: {
          isOpened: true,
          replyName: detail.name,
          replyId: detail.id
        }
      })
    }
  }

  handleChange(val) {
    const { dispatch } = this.props
    dispatch({
      type: 'productDetail/updateState',
      payload: {
        content: val
      }
    })
  }

  handleHide() {
    const { dispatch } = this.props
    dispatch({
      type: 'productDetail/updateState',
      payload: {
        isOpened: false,
        replyId: '',
        content: '',
        commentId: ''
      }
    })
  }

  handleConfirm() {
    const {
      dispatch,
      productDetail: {
        replyId,
        content,
        commentId,
        detail: { id }
      }
    } = this.props
    dispatch({
      type: 'productDetail/effectsAddComment',
      payload: {
        commentId,
        foreignId: id,
        content,
        type: 4
      }
    }).then(() => {
      this.getData()
      this.handleHide()
    })
  }

  handleFullScreen() {
    const { isFullScreen } = this.state
    this.setState({
      isFullScreen: !isFullScreen
    })
  }

  render() {
    const {
      productDetail: { detail, isOpened, replyName, content },
      loading
    } = this.props
    const { isFullScreen } = this.state

    return (
      <View className="container">
        {!isFullScreen && <NavigationBar title={detail.name} hasLeftIcon={true} />}

        <View className="container__top">
          {/* banner */}
          <Swiper className="banner" circular autoplay interval={3000}>
            {detail.videoPath && (
              <SwiperItem className="banner__item" key={item.id}>
                <Video
                  className="banner__video"
                  src={detail.videoPath}
                  direction={0}
                  onFullscreenChange={this.handleFullScreen}
                ></Video>
              </SwiperItem>
            )}
            {detail.imgPaths.map(item => {
              return (
                <SwiperItem className="banner__item" key={item}>
                  <Image className="banner__item__img" src={item} mode="aspectFit" />
                </SwiperItem>
              )
            })}
          </Swiper>
          <View className="container__top__detail">
            <View className="detail__left">
              <View className="detail__left__name">{detail.name}</View>
              <View className="detail__left__desc">{detail.companyName}</View>
            </View>
            <View className="detail__right">{detail.address}</View>
          </View>
        </View>

        <CustomNavigator title="产品详情" />
        <View className="container__detail">
          <RichText space="nbsp" nodes={detail.productDescribe}></RichText>
        </View>

        {/* 底部操作组件 */}
        <View className="container__options" style={{ paddingBottom: isFullScreenBottom ? '20px' : '' }}>
          <View className="container__gap"></View>
          <CommonOptions
            hasStar={true}
            optionId={detail.id}
            shareNum={detail.forwardCount}
            commentNum={detail.commentCount}
            starNum={detail.favoriteCount}
            zanNum={detail.fabulousCount}
            handleZanClick={() => this.handleZanClick(detail.id, detail.isFabulous)}
            isFabulous={detail.isFabulous}
            handleFavoriteClick={() => this.handleFavoriteClick(detail.id, detail.isFavorite)}
            isFavorite={detail.isFavorite}
            editComment={this.editComment.bind(this)}
            comments={detail.comments}
            type={'PRODUCT'}
            detail={detail}
          />
        </View>

        <View style={{ display: isOpened ? 'unset' : 'none' }}>
          <AtModal isOpened={isOpened}>
            <AtModalHeader>回复{replyName}</AtModalHeader>
            <AtModalContent>
              <AtInput
                name="value"
                type="text"
                placeholder={`回复${replyName || ''}`}
                value={content}
                onChange={this.handleChange.bind(this)}
              />
            </AtModalContent>
            <AtModalAction>
              <Button onClick={this.handleHide.bind(this)}>取消</Button>
              <Button onClick={this.handleConfirm.bind(this)}>确定</Button>
            </AtModalAction>
          </AtModal>
        </View>
      </View>
    )
  }
}
export default connect(({ common, productDetail, loading }) => ({
  common,
  productDetail,
  loading
}))(ProductDetail)
