import Taro from '@tarojs/taro'
import { View, Video } from '@tarojs/components'
import { AtNavBar, AtModalHeader, AtModalContent, AtModalAction, AtModal, AtInput } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import CommonOptions from '@components/page-components/common-options'
import CompanyDetailCard from '@components/page-components/company-detail-card'
import './index.less'

class videoDetail extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.getDetail()
  }

  handleBack = () => {
    navigateBack()
  }

  getDetail = () => {
    const { dispatch } = this.props
    const { id } = this.$router.params
    dispatch({
      type: 'videoDetail/effectsVideoDetail',
      payload: { id }
    })
  }

  handleZanClick = (foreignId, isFabulous) => {
    const { dispatch } = this.props
    if (!isFabulous) {
      dispatch({
        type: 'videoDetail/effectsfabulous',
        payload: {
          foreignId,
          type: 2
        }
      }).then(() => {
        this.getDetail()
      })
    } else {
      dispatch({
        type: 'videoDetail/effectsfabulousRemove',
        payload: {
          foreignId,
          type: 2
        }
      }).then(() => {
        this.getDetail()
      })
    }
  }

  handleFavoriteClick = (foreignId, isFabulous) => {
    const { dispatch } = this.props
    if (!isFabulous) {
      dispatch({
        type: 'videoDetail/effectsfavorite',
        payload: {
          foreignId,
          type: 2
        }
      }).then(() => {
        this.getDetail()
      })
    } else {
      dispatch({
        type: 'videoDetail/effectsfavoriteRemove',
        payload: {
          foreignId,
          type: 2
        }
      }).then(() => {
        this.getDetail()
      })
    }
  }

  editComment({ commentId, commentUserId, commentUserName }) {
    const {
      dispatch,
      videoDetail: { detail }
    } = this.props
    if (commentId) {
      dispatch({
        type: 'videoDetail/updateState',
        payload: {
          isOpened: true,
          replyName: commentUserName,
          replyId: commentUserId,
          commentId
        }
      })
    } else {
      dispatch({
        type: 'videoDetail/updateState',
        payload: {
          isOpened: true,
          replyName: detail.company.name,
          replyId: detail.company.id
        }
      })
    }
  }

  handleChange(val) {
    const { dispatch } = this.props
    dispatch({
      type: 'videoDetail/updateState',
      payload: {
        content: val
      }
    })
  }

  handleHide() {
    const { dispatch } = this.props
    dispatch({
      type: 'videoDetail/updateState',
      payload: {
        isOpened: false
      }
    })
  }

  handleConfirm() {
    const {
      dispatch,
      videoDetail: {
        detail: { id },
        replyId,
        content,
        commentId
      }
    } = this.props
    dispatch({
      type: 'videoDetail/effectsAddComment',
      payload: {
        commentId,
        foreignId: id,
        content,
        type: 2
      }
    }).then(() => {
      this.getDetail()
      this.handleHide()
    })
  }

  render() {
    const {
      videoDetail: { detail, isOpened, replyName, content },
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

        <View className="container__video">
          <Video className="container__video__item" src={detail.videoPath}></Video>
        </View>

        <CompanyDetailCard card={detail.company} />

        {/* 底部操作组件 */}
        <View className="container__options">
          <CommonOptions
            optionId={detail.id}
            shareNum={detail.forwardCount}
            commentNum={detail.commentCount}
            zanNum={detail.fabulousCount}
            starNum={detail.favoriteCount}
            hasStar
            handleZanClick={() => this.handleZanClick(detail.id, detail.isFabulous)}
            isFabulous={detail.isFabulous}
            handleFavoriteClick={() => this.handleFavoriteClick(detail.id, detail.isFavorite)}
            isFavorite={detail.isFavorite}
            editComment={this.editComment.bind(this)}
            comments={detail.comments}
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
export default connect(({ common, videoDetail, loading }) => ({
  common,
  videoDetail,
  loading
}))(videoDetail)
