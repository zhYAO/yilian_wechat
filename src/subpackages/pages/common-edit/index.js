import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { showToast } from '@crossplatform/apiservice/toast'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import NavigationBar from '@components/page-components/navigation-bar'
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
        theme: '座右铭',
        password: '密码',
        companyApply: '申请/修改公司'
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

  handleChange = value => {
    const { dispatch } = this.props
    const { isCompanyApply = false } = this.$router.params
    this.setState({
      inputVal: value
    })
    if (isCompanyApply) {
      dispatch({
        type: 'commonEdit/effectsCompanyList',
        payload: {
          name: value
        }
      })
    }
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

    if (key === 'password') {
      if (inputVal.length < 6) {
        showToast({
          title: '密码最少设置6位'
        })
        return
      }
      dispatch({
        type: 'commonEdit/effectsPasswordUpdate',
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
    } else {
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
  }

  handleApplyCompany = id => {
    const { dispatch } = this.props
    dispatch({
      type: 'commonEdit/effectsApplyCompany',
      payload: {
        companyId: id
      }
    }).then(() => {
      navigateBack()
    })
  }

  render() {
    const {
      commonEdit: { companyList },
      loading
    } = this.props

    const { ENUM, inputVal } = this.state

    const { key, value, isCompanyApply = false } = this.$router.params

    return (
      <View className="container">
        <NavigationBar title={ENUM[key]} hasLeftIcon={true} />

        <AtInput
          name="value"
          type={key === 'password' ? 'password' : 'text'}
          placeholder={`请输入${ENUM[key] || ''}`}
          value={value}
          onChange={this.handleChange.bind(this)}
        />

        {!isCompanyApply && (
          <View className="container__confirm" onClick={this.handleConfirm}>
            确定
          </View>
        )}

        {isCompanyApply && (
          <View className="container__list">
            {companyList.length > 0 &&
              companyList.map(item => (
                <View
                  key={item.id}
                  className="container__list__item"
                  onClick={() => this.handleApplyCompany(item.id)}
                >
                  {item.name}
                </View>
              ))}
            {companyList.length === 0 && inputVal.length > 0 && (
              <View className="container__list__empty">暂无数据</View>
            )}
          </View>
        )}
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
