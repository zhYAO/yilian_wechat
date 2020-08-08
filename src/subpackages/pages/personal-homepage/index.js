import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import CommentCard from '@components/page-components/comment-card'
import './index.less'

class PersonalHomepage extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.getInfo()
  }

  handleBack = () => {
    navigateBack()
  }

  getInfo = () => {
    const { dispatch } = this.props
    const { id } = this.$router.params
    dispatch({
      type: 'personalHomepage/effectsGetInfo',
      payload: { id }
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
        payload: { id }
      })
    } else {
      dispatch({
        type: 'personalHomepage/effectsAttention',
        payload: { id }
      })
    }
  }

  render() {
    const {
      personalHomepage: {
        userInfo: { avatarUrl, nickName },
        dynamics,
        labels,
        companyName,
        name,
        theme,
        isAttention
      },
      loading,
      common: { navBarPaddingTop }
    } = this.props

    return (
      <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
        <AtNavBar onClickLeftIcon={this.handleBack} title={name} leftIconType="chevron-left" />

        <View className="container__user">
          <View className="container__user__info">
            <Image
              className="info__aventor"
              src={
                avatarUrl ||
                'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180'
              }
            ></Image>
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
                  <CommentCard card={item} />
                </View>
              )
            })}
          </View>
        </View>

        <View className="container__bottom" onClick={this.handleAttention}>
          <View className="container__bottom__btn">{isAttention ? '已关注' : '+ 关注'}</View>
        </View>
      </View>
    )
  }
}

export default connect(({ common, personalHomepage, loading }) => ({
  common,
  personalHomepage,
  loading
}))(PersonalHomepage)
