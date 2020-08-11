import Taro, { useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import ClassList from '@components/page-components/class-list'
import { connect } from '@tarojs/redux'
import './index.less'

class ClassDetails extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    const { id } = this.$router.params
    this.getCompanyDetail(id)
  }

  handleBack = () => {
    navigateBack()
  }

  getCompanyDetail = id => {
    const { dispatch } = this.props
    dispatch({
      type: 'classDetails/effectsCompanyList',
      payload: {
        id
      }
    })
  }

  render() {
    const {
      classDetails: { classList },
      loading,
      common: { navBarPaddingTop }
    } = this.props

    const { name } = this.$router.params

    return (
      <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
        <AtNavBar onClickLeftIcon={this.handleBack} title={name} leftIconType="chevron-left" />
        <View className="container__list">
          {classList.map(item => (
            <ClassList key={item.id} card={item} />
          ))}
        </View>
      </View>
    )
  }
}

export default connect(({ common, classDetails, loading }) => ({
  common,
  classDetails,
  loading
}))(ClassDetails)
