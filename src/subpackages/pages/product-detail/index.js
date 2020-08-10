import Taro, { useEffect, render } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtNavBar, AtModalHeader, AtModalContent, AtModalAction, AtModal, AtInput } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import CustomNavigator from '@components/page-components/custom-navigator'
import CommonOptions from '@components/page-components/common-options'
import './index.less'

class ProductDetail extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.getData()
  }

  handleBack = () => {
    navigateBack()
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
      })
    } else {
      dispatch({
        type: 'productDetail/effectsfabulousRemove',
        payload: {
          foreignId,
          type: 4
        }
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
          type: 1
        }
      })
    } else {
      dispatch({
        type: 'productDetail/effectsfavoriteRemove',
        payload: {
          foreignId,
          type: 1
        }
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
        isOpened: false
      }
    })
  }

  handleConfirm() {
    const {
      dispatch,
      productDetail: { replyId, content, commentId }
    } = this.props
    dispatch({
      type: 'productDetail/effectsAddComment',
      payload: {
        commentId,
        foreignId: replyId,
        content,
        type: 1
      }
    }).then(() => {
      this.getDetail()
      this.handleHide()
    })
  }

  render() {
    const {
      productDetail: { detail, isOpened, replyName, content },
      loading,
      common: { navBarPaddingTop }
    } = this.props

    return (
      <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
        <AtNavBar
          onClickLeftIcon={this.handleBack}
          title={detail.name}
          leftIconType="chevron-left"
        />

        <View className="container__top">
          <Image className="container__top__banner"></Image>
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
          <Image className="container__detail__img"></Image>
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
            handleZanClick={() => this.handleZanClick(detail.foreignId, detail.isFabulous)}
            isFabulous={detail.isFabulous}
            handleFavoriteClick={() =>
              this.handleFavoriteClick(detail.foreignId, detail.isFavorite)
            }
            isFavorite={detail.isFavorite}
            editComment={this.editComment.bind(this)}
          />
        </View>

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
    )
  }
}
export default connect(({ common, productDetail, loading }) => ({
  common,
  productDetail,
  loading
}))(ProductDetail)
