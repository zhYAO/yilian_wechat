import Taro from '@tarojs/taro'
import { View, Block, RichText } from '@tarojs/components'
import { AtModalHeader, AtModalContent, AtModalAction, AtModal, AtInput } from 'taro-ui'
import { connect } from '@tarojs/redux'
import CustomNavigator from '@components/page-components/custom-navigator'
import CommonOptions from '@components/page-components/common-options'
import NavigationBar from '@components/page-components/navigation-bar'
import { navigateTo, navigateBack } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import { getStorageSync } from '@crossplatform/apiservice/storage'
import { showToast } from '@crossplatform/apiservice/toast'
import './index.less'

class JobDetail extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {
      isQuickSend: false,
      fileName: '',
      tempFilePaths: {}
    }
  }

  componentDidMount() {
    this.getDetail()
  }

  onShareAppMessage() {
    const { id } = this.$router.params
    const {
      jobDetail: { detail }
    } = this.props
    return {
      title: detail.name,
      path: `/subpackages/pages/job-detail/index?id=${id}`
    }
  }

  getDetail = () => {
    const { dispatch } = this.props
    const { id } = this.$router.params
    dispatch({
      type: 'jobDetail/effectsPositionDetail',
      payload: { id }
    })
  }

  jumpTo = url => {
    navigateTo({
      url: `${pagejumplist[url].path}`
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
          type: 3
        }
      }).then(() => {
        this.getDetail()
      })
    } else {
      dispatch({
        type: 'jobDetail/effectsfavoriteRemove',
        payload: {
          foreignId,
          type: 3
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
      jobDetail: {
        replyId,
        content,
        commentId,
        detail: { id }
      }
    } = this.props
    dispatch({
      type: 'jobDetail/effectsAddComment',
      payload: {
        commentId,
        foreignId: id,
        content,
        type: 3
      }
    }).then(() => {
      this.getDetail()
      this.handleHide()
    })
  }

  handleQuickSend() {
    this.setState({
      isQuickSend: true
    })
  }

  // 选择上传文件
  chooseMessageUpload() {
    const self = this
    Taro.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles[0]
        self.setState({
          tempFilePaths,
          fileName: tempFilePaths.name
        })
      }
    })
  }

  sendResume() {
    const {
      jobDetail: { detail },
      common: { token }
    } = this.props
    const { tempFilePaths } = this.state
    Taro.uploadFile({
      url: 'https://www.ilove01.cn/e-link-api/company-position/apply',
      filePath: tempFilePaths.path,
      name: 'file',
      header: {
        'Content-Type': 'multipart/form-data',
        token: token || getStorageSync('token')
      },
      formData: {
        positionId: detail.id
      },
      success(res) {
        const data = JSON.parse(res.data)
        if (data.code === '0000') {
          showToast({
            title: '发送成功'
          })
          const timer = setTimeout(() => {
            clearTimeout(timer)
            navigateBack()
          }, 1000)
        }
      }
    })
  }

  render() {
    const {
      jobDetail: { detail, isOpened, replyName, content },
      loading
    } = this.props

    const { isQuickSend } = this.state

    return (
      <View className="container">
        <NavigationBar title={detail.name} hasLeftIcon={true} />

        <View className="container__intro">
          <View className="container__intro__title">{detail.name}</View>
          <View className="container__intro__sub">
            <View className="sub__text">{detail.workplace}</View>
            <View className="sub__text">{detail.releaseTime}</View>
            <View className="sub__text">浏览{detail.lookCount}次</View>
          </View>
        </View>

        <View className="container__card">
          <Image className="container__card__img" src={detail.imgPath}></Image>
          <View className="container__card__content">
            <View className="content__name">{detail.company.name}</View>
            <View className="content__date">{detail.company.registerTime}</View>
          </View>
        </View>

        {!isQuickSend && (
          <Block>
            <CustomNavigator title="职位描述" />
            <View className="container__desc">
              <RichText space="nbsp" nodes={detail.jobDescription}></RichText>
            </View>

            <CustomNavigator title="任职要求" />
            <View className="container__desc">
              <RichText space="nbsp" nodes={detail.jobRequirements}></RichText>
            </View>

            <View className="container__options">
              <View className="container__gap"></View>
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
              <View className="container__options__btn" onClick={this.handleQuickSend}>
                快速申请
              </View>
            </View>
          </Block>
        )}

        {isQuickSend && (
          <Block>
            <View className="container__resume">
              <View className="container__resume__name">
                投递简历{fileName ? `(${fileName})` : ''}
              </View>
              <View className="container__resume__options">
                <View className="options" onClick={this.chooseMessageUpload.bind(this)}>
                  ＋
                </View>
                <View className="options options--close">×</View>
              </View>
            </View>
            <View className="container__options">
              <View className="container__options__btn" onClick={this.sendResume}>
                发送
              </View>
            </View>
          </Block>
        )}

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
export default connect(({ common, jobDetail, loading }) => ({
  common,
  jobDetail,
  loading
}))(JobDetail)
