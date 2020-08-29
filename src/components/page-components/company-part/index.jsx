import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import CompanyCard from '@components/page-components/company-card'
import CustomNavigator from '@components/page-components/custom-navigator'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import StickyWrap from '@components/page-components/sticky-wrap'

const CompanyPart = props => {
  const { title, extraText, cardList } = props

  const rightClick = () => {
    navigateTo({
      url: `${pagejumplist['recommend-list-page'].path}`
    })
  }

  return (
    <View>
      <StickyWrap height={40} fixTop={40}>
        <CustomNavigator title={title} extraText={extraText} rightClick={rightClick} />
      </StickyWrap>
      {cardList.map((item, index) => {
        if (index < 3) {
          return <CompanyCard key={item.id} data={item} />
        }
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
