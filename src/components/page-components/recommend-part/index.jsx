import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import RecommendCard from '@components/page-components/recommend-card'

const RecommendPart = props => {
  const { title, extraText, cardList } = props

  return (
    <View>
      <AtListItem title={title} extraText={extraText} arrow="right" />
      {cardList.map(item => {
        return <RecommendCard key={item.id} data={item} />
      })}
    </View>
  )
}

RecommendPart.defaultProps = {
  title: '',
  extraText: '',
  cardList: []
}

export default RecommendPart
