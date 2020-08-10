import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNavBar, AtTextarea } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import './index.less'

class PublishDynamic extends Taro.Component {
  constructor(props) {
    super(props)
    this.data = {}
  }

  handleBack = () => {
    navigateBack()
  }

  handleChange = value => {
    dispatch({
      type: 'publishDynamic/updateState',
      payload: {
        value
      }
    })
  }

  sendDynamic = () => {
    const { type = 'USER' } = this.$router.params
    dispatch({
      type: 'publishDynamic/effectsPublish',
      payload: {
        content: value,
        theme: '活动',
        type
      }
    })
  }

  render() {
    const {
      dispatch,
      publishDynamic: { value },
      loading,
      common: { navBarPaddingTop }
    } = this.props

    return (
      <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
        <AtNavBar onClickLeftIcon={this.handleBack} title="发动态" leftIconType="chevron-left" />

        <View className="container__tips">发布活动内容：</View>

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
