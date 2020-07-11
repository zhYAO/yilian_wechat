import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import CustomNavigator from '@components/page-components/custom-navigator'
import './index.less'

const HotProducts = props => {
  const { title } = props

  return (
    <View className="container">
      <CustomNavigator title={title} />
      <View className="container__cards">
        <View className="container__cards__hot">
          <Image src={require('@static/images/home/hot_products_1.png')} mode="aspectFill" />
        </View>
        <View className="container__cards__right">
          <Image src={require('@static/images/home/hot_products_2.png')} mode="aspectFill" />
          <Image src={require('@static/images/home/hot_products_3.png')} mode="aspectFill" />
        </View>
      </View>
    </View>
  )
}

HotProducts.defaultProps = {
  title: ''
}

export default HotProducts
