import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtInput,
  AtActionSheet,
  AtActionSheetItem
} from 'taro-ui'
import CommentCard from '@components/page-components/comment-card'
import SharePop from '@components/page-components/share-pop'
import NavigationBar from '@components/page-components/navigation-bar'
import './index.less'

class EditComment extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const {
      editComment: { detail }
    } = this.props
    this.getData().then(() => {
      this.handleEditComment({ commentUserId: detail.id, commentUserName: detail.publisher })
    })
  }

  getData() {
    return new Promise(resolve => {
      const { dispatch } = this.props
      const { id } = this.$router.params
      dispatch({
        type: 'editComment/effectsDetail',
        payload: {
          id
        }
      }).then(() => {
        resolve()
      })
    })
  }

  onShow = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'editComment/updateState',
      payload: {
        actionSheetOpen: true
      }
    })
  }

  onCancel = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'editComment/updateState',
      payload: {
        actionSheetOpen: false
      }
    })
  }

  handleHide() {
    const { dispatch } = this.props
    dispatch({
      type: 'editComment/updateState',
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
      editComment: {
        replyId,
        content,
        commentId,
        detail: { id }
      }
    } = this.props
    dispatch({
      type: 'editComment/effectsAddComment',
      payload: {
        commentId,
        foreignId: id,
        content,
        type: 5
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

  handleZanClick = (foreignId, isFabulous) => {
    const { dispatch } = this.props
    if (!isFabulous) {
      dispatch({
        type: 'editComment/effectsfabulous',
        payload: {
          foreignId,
          type: 5
        }
      }).then(() => {
        this.getData()
      })
    } else {
      dispatch({
        type: 'editComment/effectsfabulousRemove',
        payload: {
          foreignId,
          type: 5
        }
      }).then(() => {
        this.getData()
      })
    }
    this.onCancel()
  }

  handleCompanyAttention = (type = 2) => {
    const { id } = this.$router.params
    const {
      editComment: {
        detail: { isAttention }
      },
      dispatch
    } = this.props
    if (!isAttention) {
      dispatch({
        type: 'editComment/effectsAttention',
        payload: {
          foreignId: id,
          type
        }
      }).then(() => {
        this.getData()
      })
    } else {
      dispatch({
        type: 'editComment/effectsAttentionRemove',
        payload: {
          foreignId: id,
          type
        }
      }).then(() => {
        this.getData()
      })
    }
    this.onCancel()
  }

  handleFavoriteClick = () => {
    const {
      editComment: {
        detail: { isFavorite, id }
      },
      dispatch
    } = this.props
    if (!isFavorite) {
      dispatch({
        type: 'editComment/effectsfavorite',
        payload: {
          foreignId: id,
          type: 3
        }
      }).then(() => {
        this.getData()
      })
    } else {
      dispatch({
        type: 'editComment/effectsfavoriteRemove',
        payload: {
          foreignId: id,
          type: 3
        }
      }).then(() => {
        this.getData()
      })
    }
    this.onCancel()
  }

  handleEditComment({ commentId, commentUserId, commentUserName }) {
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

  handleSharePopShow = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'editComment/updateState',
      payload: {
        isShareOpened: true
      }
    })
  }

  handleSharePopClose = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'editComment/updateState',
      payload: {
        isShareOpened: false
      }
    })
  }

  render() {
    const {
      editComment: { detail, isOpened, replyName, content, isShareOpened, actionSheetOpen },
      loading
    } = this.props
    return (
      <View className="container">
        <NavigationBar title={`${detail.publisher}的动态`} hasLeftIcon={true} />

        <CommentCard
          card={detail}
          handleShowAction={this.onShow.bind(this)}
          handleSharePopShow={this.handleSharePopShow}
          handleZanClick={() => {
            this.handleZanClick(detail.id, detail.isFabulous)
          }}
          isFabulous={detail.isFabulous}
          editComment={this.handleEditComment.bind(this)}
          defaultShowComment={true}
        />

        <View style={{ display: isOpened ? 'unset' : 'none' }}>
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

        <SharePop isOpened={isShareOpened} onClose={this.handleSharePopClose} />

        <AtActionSheet
          isOpened={actionSheetOpen}
          cancelText="取消"
          onCancel={this.onCancel}
          onClose={this.onCancel}
        >
          <AtActionSheetItem onClick={() => this.handleCompanyAttention(1)}>
            {detail.isAttention ? '取消关注' : '关注作者'}
          </AtActionSheetItem>
          <AtActionSheetItem onClick={this.handleFavoriteClick}>
            {detail.isFavorite ? '取消收藏' : '收藏动态'}
          </AtActionSheetItem>
          {/* <AtActionSheetItem>举报</AtActionSheetItem> */}
        </AtActionSheet>
      </View>
    )
  }
}

export default connect(({ common, editComment, loading }) => ({
  common,
  editComment,
  loading
}))(EditComment)
