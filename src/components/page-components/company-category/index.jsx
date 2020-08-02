import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import './index.less'

const CompanyCategory = props => {
  const { list } = props

  const handleClick = id => {
    navigateTo({
      url: `${pagejumplist['class-details'].path}?id=${id}`
    })
  }

  return (
    <View className="container">
      <View className="container__grid">
        {list.map(item => (
          <View
            className="container__grid__item"
            key={item.id}
            onClick={() => {
              handleClick(item.id)
            }}
          >
            <Image className="item__icon" src={item.imgPath} />
            <Text className="item__title">{item.label}</Text>
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
