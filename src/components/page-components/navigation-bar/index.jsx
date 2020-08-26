import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { getGlobalData } from '@configuration/globaldata'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import { AtNavBar } from 'taro-ui'
import './index.less'

const NavigationBar = props => {
  const { title, hasLeftIcon } = props
  const { navBarPaddingTop } = getGlobalData()

  const handleBack = () => {
    navigateBack()
  }

  return (
    <View>
      <View className="bar" style={{ paddingTop: navBarPaddingTop + 'px' }}>
        <AtNavBar
          onClickLeftIcon={handleBack}
          title={title}
          leftIconType={hasLeftIcon ? 'chevron-left' : ''}
        />
      </View>
      <View className="bar__empty" style={{ paddingTop: navBarPaddingTop + 'px' }}></View>
    </View>
  )
}

NavigationBar.defaultProps = {
  title: ''
}

export default NavigationBar
