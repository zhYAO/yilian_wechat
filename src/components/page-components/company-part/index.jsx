import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import CompanyCard from '@components/page-components/company-card'
import CustomNavigator from '@components/page-components/custom-navigator'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'

const CompanyPart = props => {
  const { title, extraText, cardList } = props

  const rightClick = () => {
    navigateTo({
      url: `${pagejumplist['recommend-list-page'].path}`
    })
  }

  return (
    <View>
      <CustomNavigator title={title} extraText={extraText} rightClick={rightClick} />
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
