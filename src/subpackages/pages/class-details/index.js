import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import ClassList from '@components/page-components/class-list'
import { connect } from '@tarojs/redux'
import NavigationBar from '@components/page-components/navigation-bar'
import './index.less'

class ClassDetails extends Taro.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.getCompanyDetail()
  }

  getCompanyDetail = () => {
    const { id } = this.$router.params
    const { dispatch } = this.props
    dispatch({
      type: 'classDetails/effectsCompanyList',
      payload: {
        labelId: id
      }
    })
  }

  render() {
    const {
      classDetails: { classList },
      loading
    } = this.props

    const { name } = this.$router.params

    return (
      <View className="container">
        <NavigationBar title={name} hasLeftIcon={true} />

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
