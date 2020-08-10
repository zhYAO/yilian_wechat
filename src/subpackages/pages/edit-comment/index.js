import Taro, { render } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {
  AtNavBar,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtInput,
  AtForm
} from 'taro-ui'
import CommentCard from '@components/page-components/comment-card'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import './index.less'

class EditComment extends Taro.Component {
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
      type: 'editComment/effectsDetail',
      payload: {
        id
      }
    })
  }

  onShow() {}

  handleHide() {
    const { dispatch } = this.props
    dispatch({
      type: 'editComment/updateState',
      payload: {
        isOpened: false
      }
    })
  }

  handleConfirm() {
    const {
      dispatch,
      editComment: { replyId, content, commentId }
    } = this.props
    dispatch({
      type: 'editComment/effectsAddComment',
      payload: {
        commentId,
        foreignId: replyId,
        content,
        type: 3
      }
    }).then(() => {
      this.getData()
      this.handleHide()
    })
  }

  handleChange(val) {
    const { dispatch } = this.props
    dispatch({
      type: 'editComment/updateState',
      payload: {
        content: val
      }
    })
  }

  handleZanClick() {}

  editComment({ commentId, commentUserId, commentUserName }) {
    const {
      dispatch,
      editComment: { detail }
    } = this.props
    if (commentId) {
      dispatch({
        type: 'editComment/updateState',
        payload: {
          isOpened: true,
          replyName: commentUserName,
          replyId: commentUserId,
          commentId
        }
      })
    } else {
      dispatch({
        type: 'editComment/updateState',
        payload: {
          isOpened: true,
          replyName: detail.publisher,
          replyId: detail.id
        }
      })
    }
  }

  render() {
    const {
      editComment: { detail, isOpened, replyName, content },
      loading,
      common: { navBarPaddingTop }
    } = this.props
    return (
      <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
        <AtNavBar
          onClickLeftIcon={this.handleBack.bind(this)}
          title={`${detail.publisher}的动态`}
          leftIconType="chevron-left"
        />
        <CommentCard
          card={detail}
          handleShowAction={this.onShow.bind(this)}
          handleSharePopShow={this.handleSharePopShow}
          handleZanClick={this.handleZanClick.bind(this)}
          isFabulous={detail.isFabulous}
          editComment={this.editComment.bind(this)}
        />

        <AtModal isOpened={isOpened}>
          <AtModalHeader>回复{replyName}</AtModalHeader>
          <AtModalContent>
            <AtInput
              name="value"
              type="text"
              placeholder={`回复${replyName}`}
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

export default connect(({ common, editComment, loading }) => ({
  common,
  editComment,
  loading
}))(EditComment)
