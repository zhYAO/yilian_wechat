import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { connect } from '@tarojs/redux'
import CommentCard from '@components/page-components/comment-card'
import SharePop from '@components/page-components/share-pop'
import NavigationBar from '@components/page-components/navigation-bar'
import { stopPullDownRefresh } from '@crossplatform/apiservice/reflash'
import { getStorageSync } from '@crossplatform/apiservice/storage'
import './index.less'

let shareText = ''

class PersonalHomepage extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemActive: {}
    }
  }

  componentDidShow() {
    this.getInfo()
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({
      type: 'personalHomepage/updateState',
      payload: {
        companyName: '',
        name: '',
        theme: '',
        imgPath: '',
        isAttention: false,
        actionSheetOpen: false,
        isShareOpened: false
      }
    })
  }

  onPullDownRefresh() {
    this.getInfo().then(() => {
      stopPullDownRefresh()
    })
  }

  onShareAppMessage() {
    const { id } = this.$router.params
    const {
      personalHomepage: { name }
    } = this.props
    return {
      title: shareText || name,
      path: `/subpackages/pages/personal-homepage/index?id=${id}`
    }
  }

  getInfo = () => {
    return new Promise(resolve => {
      const { dispatch } = this.props
      const { id } = this.$router.params
      dispatch({
        type: 'personalHomepage/effectsGetInfo',
        payload: { id }
      }).then(() => {
        resolve()
      })
    })
  }

  onShow = item => {
    const {
      dispatch,
      common: { userId },
      personalHomepage: { id }
    } = this.props
    const { isMine } = this.$router.params
    const isMineVisit = isMine || userId === id || getStorageSync('userId') === id

    if (!isMineVisit) {
      dispatch({
        type: 'personalHomepage/updateState',
        payload: {
          actionSheetOpen: true
        }
      })
      this.setState({
        itemActive: item
      })
    }
  }

  onCancel = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'personalHomepage/updateState',
      payload: {
        actionSheetOpen: false
      }
    })
  }

  handleAttention = () => {
    const {
      dispatch,
      personalHomepage: { isAttention }
    } = this.props
    const { id } = this.$router.params
    if (isAttention) {
      dispatch({
        type: 'personalHomepage/effectsAttentionRemove',
        payload: { foreignId: Number(id), type: 1 }
      }).then(() => {
        this.getInfo()
      })
    } else {
      dispatch({
        type: 'personalHomepage/effectsAttention',
        payload: { foreignId: Number(id), type: 1 }
      }).then(() => {
        this.getInfo()
      })
    }
  }

  handleSharePopShow = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'personalHomepage/updateState',
      payload: {
        isShareOpened: true
      }
    })
  }

  handleSharePopClose = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'personalHomepage/updateState',
      payload: {
        isShareOpened: false
      }
    })
  }

  handleZanClick = (foreignId, isFabulous) => {
    const { dispatch } = this.props
    if (!isFabulous) {
      dispatch({
        type: 'personalHomepage/effectsfabulous',
        payload: {
          foreignId,
          type: 5
        }
      }).then(() => {
        this.getInfo()
      })
    } else {
      dispatch({
        type: 'personalHomepage/effectsfabulousRemove',
        payload: {
          foreignId,
          type: 5
        }
      }).then(() => {
        this.getInfo()
      })
    }
    this.onCancel()
  }

  handleFavoriteClick = () => {
    const { isFavorite, id } = this.state.itemActive
    const { dispatch } = this.props
    if (!isFavorite) {
      dispatch({
        type: 'personalHomepage/effectsfavorite',
        payload: {
          foreignId: id,
          type: 3
        }
      }).then(() => {
        this.getInfo()
      })
    } else {
      dispatch({
        type: 'personalHomepage/effectsfavoriteRemove',
        payload: {
          foreignId: id,
          type: 3
        }
      }).then(() => {
        this.getInfo()
      })
    }
    this.onCancel()
  }

  handleSharePopChange = val => {
    shareText = val
  }

  render() {
    const {
      common: { userId },
      personalHomepage: {
        userInfo: { avatarUrl, nickName },
        id,
        dynamics,
        labels,
        companyName,
        name,
        theme,
        actionSheetOpen,
        isShareOpened,
        isAttention,
        imgPath
      },
      loading
    } = this.props

    const { isMine } = this.$router.params

    const { itemActive } = this.state

    const isMineVisit = isMine || userId === id || getStorageSync('userId') === id

    return (
      <View className="container">
        <NavigationBar title={name} hasLeftIcon={true} />

        <View className="container__user">
          <Image
            className="container__user__bg"
            src={require('@static/images/common/bg.png')}
            mode="aspectFit"
          />
          <View className="container__user__info">
            <Image className="info__aventor" src={imgPath}></Image>
            <View className="info__name">{name || ''}</View>
            <View className="info__score">{companyName}</View>
            <View className="info__labels">
              {labels.map((item, index) => {
                if (index < 4) {
                  return (
                    <View key={index} className="info__labels__item">
                      {item}
                    </View>
                  )
                }
              })}
            </View>
            <View className="info__intro">{theme}</View>
          </View>
        </View>

        <View className="container__trends">
          <View className="container__trends__title">他的动态</View>
          <View className="container__trends__list">
            {dynamics.map(item => {
              return (
                <View className="list__item">
                  <CommentCard
                    card={item}
                    handleShowAction={() => this.onShow(item)}
                    handleSharePopShow={this.handleSharePopShow}
                    handleZanClick={() => this.handleZanClick(item.id, item.isFabulous)}
                    isFabulous={item.isFabulous}
                    isMine={isMineVisit}
                  />
                </View>
              )
            })}
          </View>
        </View>

        <View className="container__bottom">
          <Button className="container__bottom__btn btn" openType="share">
            立即转发
          </Button>
          {!isMineVisit && (
            <View className="container__bottom__btn" onClick={this.handleAttention}>{isAttention ? '已关注' : '+ 关注'}</View>
          )}
        </View>

        <AtActionSheet
          isOpened={actionSheetOpen}
          cancelText="取消"
          onCancel={this.onCancel}
          onClose={this.onCancel}
        >
          <AtActionSheetItem onClick={this.handleAttention}>
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
          type={'PERSONAL'}
          detail={this.props.personalHomepage}
        />
      </View>
    )
  }
}

PersonalHomepage.config = {
  enablePullDownRefresh: true
}

export default connect(({ common, personalHomepage, loading }) => ({
  common,
  personalHomepage,
  loading
}))(PersonalHomepage)
