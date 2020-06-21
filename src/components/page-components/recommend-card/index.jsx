import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.less'

const CompanyPart = props => {
  const { data } = props

  return (
    <View class="container">
      <Image src={data.picUrl} className="container__img" mode="widthFix" />
      <View className="container__content">
        <View className="container__content__left">
          <Text className="right__title">{data.title}</Text>
          <Text className="right__desc">{data.desc}</Text>
        </View>
        <Text className="container__content__name">{data.companyName}</Text>
      </View>
    </View>
  )
}

CompanyPart.defaultProps = {
  data: {
    id: null,
    picUrl: '',
    companyName: '',
    desc: '',
    title: ''
  }
}

export default CompanyPart
