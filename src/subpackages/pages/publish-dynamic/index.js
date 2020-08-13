import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNavBar, AtTextarea } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import './index.less'

class PublishDynamic extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActivity: false
    }
  }

  componentWillUnmount() {
    this.handleClearData()
  }

  handleBack = () => {
    navigateBack()
  }

  handleChange = value => {
    const { dispatch } = this.props
    dispatch({
      type: 'publishDynamic/updateState',
      payload: {
        value
      }
    })
  }

  sendDynamic = () => {
    const {
      dispatch,
      publishDynamic: { value }
    } = this.props
    const { type = 'USER' } = this.$router.params
    const { isActivity } = this.state
    let params = {
      content: value,
      type
    }
    if (isActivity) {
      params.theme = '活动'
    }
    dispatch({
      type: 'publishDynamic/effectsPublish',
      payload: params
    }).then(() => {
      navigateBack()
    })
  }

  handleActivity = () => {
    const {
      dispatch,
      publishDynamic: { value }
    } = this.props
    const { isActivity } = this.state
    if (isActivity) {
      this.setState({
        isActivity: false
      })
      dispatch({
        type: 'publishDynamic/updateState',
        payload: {
          value: value.replace('#活动 ', '')
        }
      })
    } else {
      this.setState({
        isActivity: true
      })
      dispatch({
        type: 'publishDynamic/updateState',
        payload: {
          value: '#活动 ' + value
        }
      })
    }
  }

  handleClearData = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'publishDynamic/updateState',
      payload: {
        value: ''
      }
    })
    this.setState({
      isActivity: false
    })
  }

  render() {
    const {
      dispatch,
      publishDynamic: { value = '' },
      loading,
      common: { navBarPaddingTop }
    } = this.props

    return (
      <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
        <AtNavBar onClickLeftIcon={this.handleBack} title="发动态" leftIconType="chevron-left" />

        <View className="container__tips">
          <View>发布活动内容：</View>
          <View
            className={`container__tips__activity ${
              isActivity ? 'container__tips__activity--active' : ''
            }`}
            onClick={this.handleActivity}
          >
            #活动
          </View>
        </View>

        <AtTextarea
          value={value}
          onChange={this.handleChange}
          maxLength={400}
          placeholder="发布活动内容："
          onConfirm={this.sendDynamic}
        />

        <View className="container__options">
          <View className="container__options__send" onClick={this.sendDynamic}>
            发送
          </View>
        </View>
      </View>
    )
  }
}

export default connect(({ common, publishDynamic, loading }) => ({
  common,
  publishDynamic,
  loading
}))(PublishDynamic)
