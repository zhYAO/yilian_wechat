import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import { getGlobalData } from '@configuration/globaldata'
import './index.less'

const SeachPart = props => {
  const { children } = props
  const { navBarPaddingTop } = getGlobalData()

  const handleClick = () => {
    navigateTo({
      url: `${pagejumplist['search-page'].path}`
    })
  }

  return (
    <View>
      <View className="search" style={{ paddingTop: navBarPaddingTop + 'px' }}>
        {children}
        <View className="search__btn" onClick={handleClick}>
          <Image
            className="search__icon"
            src={require('@static/images/home/search.png')}
            mode="aspectFill"
          ></Image>
          <Text className="search__desc">输入想要查找的内容</Text>
        </View>
      </View>
      <View className="search__empty" style={{ paddingTop: navBarPaddingTop + 'px' }}></View>
    </View>
  )
}

SeachPart.defaultProps = {
  onNavTo: () => {}
}

export default SeachPart
