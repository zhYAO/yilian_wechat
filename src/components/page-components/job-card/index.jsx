import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.less'

const JobCard = props => {
  const { card } = props
  return (
    <View className="container">
      <Image className="container__img" src={card.src}></Image>
      <View className="container__content">
        <View className="container__content__title">{card.jobTitle}</View>
        <View className="container__content__place">{card.place}</View>
        <View className="container__content__area">{card.area}</View>
      </View>
      <View className="container__right">
        <View className="container__right__date">{card.time}</View>
        <View className="container__right__city">{card.city}</View>
      </View>
    </View>
  )
}

JobCard.defaultProps = {
  card: {}
}

export default JobCard
