import Taro from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import RecommendCard from '@components/page-components/recommend-card'
import './index.less'

const CompanyPart = props => {
  const { title, cardList } = props

  return (
    <View className="container">
      <View className="container__title">
        <Text>{title}</Text>
      </View>
      <ScrollView className="list">
        {cardList.map(item => {
          return (
            <View className="list__card">
              <RecommendCard data={item} />
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

CompanyPart.defaultProps = {
  title: '',
  cardList: []
}

export default CompanyPart
