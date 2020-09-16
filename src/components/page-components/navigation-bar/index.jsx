import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { getGlobalData } from '@configuration/globaldata'
import { navigateBack, switchTab } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import { AtNavBar } from 'taro-ui'
import './index.less'

const NavigationBar = props => {
  const { title, hasLeftIcon } = props
  const { navBarPaddingTop } = getGlobalData()

  const handleBack = () => {
    navigateBack({
      fail: () => {
        switchTab({
          url: `${pagejumplist['home'].path}`
        })
      }
    })
  }

  return (
    <View>
      <View
        className="bar"
        style={{
          paddingTop: navBarPaddingTop + 'px',
          backgroundImage: hasLeftIcon ? '' : 'linear-gradient(to left, #5271ff , #839aff)'
        }}
      >
        {hasLeftIcon ? (
          <AtNavBar onClickLeftIcon={handleBack} title={title} leftIconType="chevron-left" />
        ) : (
          <View className="bar__title">{title}</View>
        )}
      </View>
      <View className="bar__empty" style={{ paddingTop: navBarPaddingTop + 'px' }}></View>
    </View>
  )
}

NavigationBar.defaultProps = {
  title: ''
}

export default NavigationBar
