import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import './index.less'

const JobCard = props => {
  const { card } = props

  const handleClick = () => {
    navigateTo({
      url: `${pagejumplist['job-detail'].path}?id=${card.id}`
    })
  }

  return (
    <View className="container" onClick={handleClick}>
      <Image className="container__img" src={card.imgPath}></Image>
      <View className="container__content">
        <View className="container__content__title">{card.name}</View>
        <View className="container__content__place">{card.department}</View>
        <View className="container__content__area">{card.jobDescription}</View>
      </View>
      <View className="container__right">
        <View className="container__right__date">{card.updateTime}</View>
        <View className="container__right__city">{card.workplace}</View>
      </View>
    </View>
  )
}

JobCard.defaultProps = {
  card: {}
}

export default JobCard
