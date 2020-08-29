import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import CustomNavigator from '@components/page-components/custom-navigator'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import StickyWrap from '@components/page-components/sticky-wrap'
import './index.less'

const HotProducts = props => {
  const { title, hotList = [] } = props

  const handleClick = id => {
    navigateTo({
      url: `${pagejumplist['product-detail'].path}?id=${id}`
    })
  }

  return (
    <View className="container">
      <StickyWrap height={40} fixTop={40}>
        <CustomNavigator title={title} />
      </StickyWrap>
      <View className="container__cards">
        {hotList.map(item => {
          return (
            <View
              key={item.id}
              className="container__cards__hot"
              onClick={() => handleClick(item.id)}
            >
              <Image src={item.imgPath} mode="aspectFill" />
              <View className="hot__name">{item.name}</View>
              <View className="hot__subname">{item.companyName}</View>
            </View>
          )
        })}
      </View>
    </View>
  )
}

HotProducts.defaultProps = {
  title: ''
}

export default HotProducts
