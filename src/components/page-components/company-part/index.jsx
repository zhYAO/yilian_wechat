import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import CompanyCard from '@components/page-components/company-card'

const CompanyPart = props => {
  const { title, extraText, cardList } = props

  return (
    <View>
      <AtListItem title={title} extraText={extraText} arrow="right" />
      {cardList.map(item => {
        return <CompanyCard key={item.id} data={item} />
      })}
    </View>
  )
}

CompanyPart.defaultProps = {
  title: '',
  extraText: '',
  cardList: []
}

export default CompanyPart
