import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import './index.less'

const CustomNavigator = props => {
  const { title, extraText, rightClick, type = '' } = props

  const handleExtraClick = () => {
    rightClick()
  }

  const handleClick = () => {
    navigateTo({
      url: `${pagejumplist['search-page'].path}`
    })
  }

  return (
    <View className="nav">
      <View className="nav__left">
        <View className="nav__left__icon"></View>
        <Text className="nav__left__title">{title}</Text>
      </View>
      {extraText && (
        <Text className="nav__desc" onClick={handleExtraClick}>
          {extraText}
        </Text>
      )}

      {type && (
        <View className="search__btn" onClick={handleClick}>
          <Image
            className="search__icon"
            src={require('@static/images/home/search.png')}
            mode="aspectFill"
          ></Image>
          <Text className="search__desc">输入想要查找的内容</Text>
        </View>
      )}
    </View>
  )
}

CustomNavigator.defaultProps = {
  title: '',
  extraText: '',
  rightClick: () => {}
}

export default CustomNavigator
