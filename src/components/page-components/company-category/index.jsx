import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import './index.less'

const CompanyCategory = props => {
  const { list } = props

  const handleClick = () => {
    navigateTo({
      url: `${pagejumplist['class-details'].path}`
    })
  }

  return (
    <View className="container">
      <View className="container__grid">
        {list.map(item => (
          <View className="container__grid__item" key={item.id} onClick={handleClick}>
            <Image className="item__icon" src={item.src} />
            <Text className="item__title">{item.title}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

CompanyCategory.defaultProps = {
  list: []
}

export default CompanyCategory
