import Taro from '@tarojs/taro'
import { View, Text, RichText } from '@tarojs/components'
import { AtNavBar, AtInput } from 'taro-ui'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import { connect } from '@tarojs/redux'
import './index.less'

class CommonEdit extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {
      ENUM: {
        name: '昵称',
        email: '邮箱',
        companyName: '公司',
        job: '职位',
        weChat: '微信号',
        mobile: '手机号',
        theme: '座右铭'
      },
      inputVal: ''
    }
  }

  componentDidMount() {
    const { value } = this.$router.params
    this.setState({
      inputVal: value
    })
  }

  handleBack = () => {
    navigateBack()
  }

  handleChange = value => {
    this.setState({
      inputVal: value
    })
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value
  }

  handleConfirm = () => {
    const { inputVal } = this.state
    const {
      dispatch,
      mine: { userInfo }
    } = this.props
    const { key } = this.$router.params
    let params = {}

    params[key] = inputVal

    dispatch({
      type: 'commonEdit/effectsUpdate',
      payload: params
    }).then(() => {
      navigateBack()

      dispatch({
        type: 'mine/updateState',
        payload: {
          userInfo: {
            ...userInfo,
            ...params
          }
        }
      })
    })
  }

  render() {
    const {
      common: { navBarPaddingTop },
      commonEdit,
      loading
    } = this.props

    const { ENUM } = this.state

    const { key, value } = this.$router.params

    return (
      <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
        <AtNavBar onClickLeftIcon={this.handleBack} title={ENUM[key]} leftIconType="chevron-left" />

        <AtInput
          name="value"
          type="text"
          placeholder={`请输入${ENUM[key] || ''}`}
          value={value}
          onChange={this.handleChange.bind(this)}
        />

        <View className="container__confirm" onClick={this.handleConfirm}>
          确定
        </View>
      </View>
    )
  }
}

export default connect(({ common, commonEdit, loading, mine }) => ({
  common,
  commonEdit,
  loading,
  mine
}))(CommonEdit)
