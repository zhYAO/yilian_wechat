import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNavBar, AtTextarea } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import './index.less'

const PublishDynamic = props => {
  const {
    dispatch,
    publishDynamic: { value },
    loading,
    common: { navBarPaddingTop }
  } = props

  const handleBack = () => {
    navigateBack()
  }

  const handleChange = value => {
    dispatch({
      type: 'publishDynamic/updateState',
      payload: {
        value
      }
    })
  }

  const sendDynamic = () => {
    dispatch({
      type: 'publishDynamic/effectsPublish',
      payload: {
        content: value,
        theme: '活动',
        type: 'USER'
      }
    })
  }

  return (
    <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      <AtNavBar onClickLeftIcon={handleBack} title="发动态" leftIconType="chevron-left" />

      <View className="container__tips">发布活动内容：</View>

      <AtTextarea
        value={value}
        onChange={handleChange}
        maxLength={400}
        placeholder="发布活动内容："
        onConfirm={sendDynamic}
      />

      <View className="container__options">
        <View className="container__options__send" onClick={sendDynamic}>
          发送
        </View>
      </View>
    </View>
  )
}

export default connect(({ common, publishDynamic, loading }) => ({
  common,
  publishDynamic,
  loading
}))(PublishDynamic)
