import Taro from '@tarojs/taro'
import { View, Image, Video } from '@tarojs/components'
import { AtModalHeader, AtModalContent, AtModalAction, AtModal, AtInput } from 'taro-ui'
import { connect } from '@tarojs/redux'
import CustomNavigator from '@components/page-components/custom-navigator'
import CommonOptions from '@components/page-components/common-options'
import NavigationBar from '@components/page-components/navigation-bar'
import './index.less'

class ProductDetail extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.getData()
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

  render() {
    const {
      productDetail: { detail, isOpened, replyName, content },
      loading
    } = this.props

    return (
      <View className="container">
        <NavigationBar title={detail.name} hasLeftIcon={true} />

        <View className="container__top">
          <Video
            className="container__top__banner"
            src={detail.videoPath}
            show-fullscreen-btn={detail.videoPath}
            direction={0}
          ></Video>
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
          {detail.imgPaths.map(item => {
            return <Image className="container__detail__img" src={item} mode="widthFix"></Image>
          })}
        </View>

        <View className="container__gap"></View>

        {/* 底部操作组件 */}
        <View className="container__options">
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
          />
        </View>

        <AtModal isOpened={isOpened} style={{ display: isOpened ? 'unset' : 'none' }}>
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
    )
  }
}
export default connect(({ common, productDetail, loading }) => ({
  common,
  productDetail,
  loading
}))(ProductDetail)
