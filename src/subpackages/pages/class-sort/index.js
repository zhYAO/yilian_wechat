import Taro, { useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import ClassCard from '@components/page-components/class-card'
import './index.less'

const ClassSort = props => {
  const {
    dispatch,
    common: { navBarPaddingTop },
    classSort: { classList },
    loading
  } = props

  useEffect(() => {
    getLabel()
  }, [])

  const handleBack = () => {
    navigateBack()
  }

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
      targetLabelId = classList[targetIndex].id
    } else if (type === 'minus') {
      targetIndex = index + 1 > classList.length - 1 ? 0 : index + 1
      targetLabelId = classList[targetIndex].id
    }
    console.log(targetIndex, 'targetIndextargetIndex')
    dispatch({
      type: 'classSort/effectsChangeSort',
      payload: {
        resourceLabelId,
        targetLabelId
      }
    })
  }

  return (
    <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      <AtNavBar onClickLeftIcon={handleBack} title="排序" leftIconType="chevron-left" />

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
