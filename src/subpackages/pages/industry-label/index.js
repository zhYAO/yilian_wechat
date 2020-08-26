import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import NavigationBar from '@components/page-components/navigation-bar'
import './index.less'

const IndustryLabel = props => {
  const {
    dispatch,
    industryLabel: { industryLabels, chosedLabels },
    mine: {
      userInfo: { labels = [] }
    },
    loading
  } = props

  useDidShow(() => {
    getLabelList()

    dispatch({
      type: 'industryLabel/updateState',
      payload: {
        chosedLabels: labels
      }
    })
  }, [])

  const getLabelList = () => {
    dispatch({
      type: 'industryLabel/effectsLabelList',
      payload: {}
    })
  }

  const handleSave = () => {
    // 点击保存按钮
    const ids = chosedLabels.map(item => {
      return item.id
    })
    dispatch({
      type: 'industryLabel/effectsModifyLabel',
      payload: { ids }
    }).then(() => {
      navigateBack()
    })
  }

  const handleChoose = item => {
    let arr = chosedLabels.concat([item])
    let obj = {}
    dispatch({
      type: 'industryLabel/updateState',
      payload: {
        chosedLabels: arr.reduce((cur, next) => {
          obj[next.id] ? '' : (obj[next.id] = true && cur.push(next))
          return cur
        }, [])
      }
    })
  }

  const handleDel = index => {
    dispatch({
      type: 'industryLabel/updateState',
      payload: {
        chosedLabels: [].concat(chosedLabels.slice(0, index), chosedLabels.slice(index + 1))
      }
    })
  }

  const handleClear = () => {
    dispatch({
      type: 'industryLabel/updateState',
      payload: {
        chosedLabels: []
      }
    })
  }

  return (
    <View className="container">
      <NavigationBar title="关注领域" hasLeftIcon={true} />

      <View className="container__chosed">
        {chosedLabels.map((item, index) => {
          return (
            <View key={index} className="container__chosed__item">
              <Text className="item__text">{item.label}</Text>
              <View className="item__del" onClick={() => handleDel(index)}>
                X
              </View>
            </View>
          )
        })}

        <View className="container__chosed__clear" onClick={handleClear}>
          X
        </View>
      </View>

      <View className="container__list">
        {industryLabels.map((item, index) => {
          return (
            <View key={index} className="container__list__item" onClick={() => handleChoose(item)}>
              {item.label}
            </View>
          )
        })}
      </View>

      <View className="container__btn" onClick={handleSave}>
        保存
      </View>
    </View>
  )
}

export default connect(({ mine, common, industryLabel, loading }) => ({
  mine,
  common,
  industryLabel,
  loading
}))(IndustryLabel)
