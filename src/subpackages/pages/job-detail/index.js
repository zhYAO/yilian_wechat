import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNavBar, AtModalHeader, AtModalContent, AtModalAction, AtModal, AtInput } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import CustomNavigator from '@components/page-components/custom-navigator'
import CommonOptions from '@components/page-components/common-options'
import './index.less'

class JobDetail extends Taro.Component {
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
      type: 'jobDetail/effectsPositionDetail',
      payload: { id }
    })
  }

  handleZanClick = (foreignId, isFabulous) => {
    const { dispatch } = this.props
    if (!isFabulous) {
      dispatch({
        type: 'jobDetail/effectsfabulous',
        payload: {
          foreignId,
          type: 3
        }
      }).then(() => {
        this.getDetail()
      })
    } else {
      dispatch({
        type: 'jobDetail/effectsfabulousRemove',
        payload: {
          foreignId,
          type: 3
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
        type: 'jobDetail/effectsfavorite',
        payload: {
          foreignId,
          type: 2
        }
      }).then(() => {
        this.getDetail()
      })
    } else {
      dispatch({
        type: 'jobDetail/effectsfavoriteRemove',
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
      jobDetail: { detail }
    } = this.props
    if (commentId) {
      dispatch({
        type: 'jobDetail/updateState',
        payload: {
          isOpened: true,
          replyName: commentUserName,
          replyId: commentUserId,
          commentId
        }
      })
    } else {
      dispatch({
        type: 'jobDetail/updateState',
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
      type: 'jobDetail/updateState',
      payload: {
        content: val
      }
    })
  }

  handleHide() {
    const { dispatch } = this.props
    dispatch({
      type: 'jobDetail/updateState',
      payload: {
        isOpened: false
      }
    })
  }

  handleConfirm() {
    const {
      dispatch,
      jobDetail: { replyId, content, commentId }
    } = this.props
    dispatch({
      type: 'jobDetail/effectsAddComment',
      payload: {
        commentId,
        foreignId: replyId,
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
      jobDetail: { detail, isOpened, replyName, content },
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

        <View className="container__intro">
          <View className="container__intro__title">{detail.name}</View>
          <View className="container__intro__sub">
            <View className="sub__text">{detail.workplace}</View>
            <View className="sub__text">{detail.releaseTime}</View>
            <View className="sub__text">{detail.lookCount}人浏览</View>
          </View>
        </View>

        <View className="container__card">
          <Image className="container__card__img" src={detail.imgPath}></Image>
          <View className="container__card__content">
            <View className="content__name">{detail.company.name}</View>
            <View className="content__date">{detail.company.registerTime}</View>
          </View>
        </View>

        <CustomNavigator title="职位描述" />
        <View className="container__desc">{detail.jobDescription}</View>

        <CustomNavigator title="任职要求" />
        <View className="container__desc">{detail.jobRequirements}</View>

        <View className="container__gap"></View>

        {/* 底部操作组件 */}
        <View className="container__options">
          <CommonOptions
            optionId={detail.id}
            shareNum={detail.forwardCount}
            commentNum={detail.commentCount}
            zanNum={detail.fabulousCount}
            starNum={detail.favoriteCount}
            hasStar
            handleZanClick={() => this.handleZanClick(detail.company.id, detail.isFabulous)}
            isFabulous={detail.isFabulous}
            handleFavoriteClick={() =>
              this.handleFavoriteClick(detail.company.id, detail.isFavorite)
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
export default connect(({ common, jobDetail, loading }) => ({
  common,
  jobDetail,
  loading
}))(JobDetail)
