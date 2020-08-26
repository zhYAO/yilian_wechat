import Taro, { useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import ClassCard from '@components/page-components/class-card'
import NavigationBar from '@components/page-components/navigation-bar'
import './index.less'

const ClassSort = props => {
  const {
    dispatch,
    classSort: { classList },
    loading
  } = props

  useDidShow(() => {
    getLabel()
  }, [])

  const getLabel = () => {
    dispatch({
      type: 'classSort/effectsLabelList',
      payload: {}
    })
  }

  const changeSort = (resourceLabelId, index, type) => {
    let targetLabelId = 0
    let targetIndex = 0
    if (type === 'add') {
      targetIndex = index - 1 < 0 ? classList.length - 1 : index - 1
      targetLabelId = classList[targetIndex].labelId
    } else if (type === 'minus') {
      targetIndex = index + 1 > classList.length - 1 ? 0 : index + 1
      targetLabelId = classList[targetIndex].labelId
    }
    dispatch({
      type: 'classSort/effectsChangeSort',
      payload: {
        resourceLabelId,
        targetLabelId
      }
    })
  }

  return (
    <View className="container">
      <NavigationBar title="排序" hasLeftIcon={true} />

      {classList.map((item, index) => (
        <ClassCard card={item} index={index} handleChangeSort={changeSort} />
      ))}
    </View>
  )
}
export default connect(({ common, classSort, loading }) => ({
  common,
  classSort,
  loading
}))(ClassSort)
