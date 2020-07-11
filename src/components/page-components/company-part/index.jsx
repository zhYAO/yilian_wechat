import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import CompanyCard from '@components/page-components/company-card'
import CustomNavigator from '@components/page-components/custom-navigator'

const CompanyPart = props => {
  const { title, extraText, cardList } = props

  return (
    <View>
      <CustomNavigator title={title} extraText={extraText} />
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
