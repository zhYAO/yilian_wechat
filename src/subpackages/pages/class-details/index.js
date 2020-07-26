import Taro, { useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import { navigateBack } from '@crossplatform/apiservice/navigate'
import JobCard from '@components/page-components/job-card'
import { connect } from '@tarojs/redux'
import './index.less'

const ClassDetails = props => {
  const {
    classDetails: { jobList },
    loading,
    common: { navBarPaddingTop }
  } = props

  const handleBack = () => {
    navigateBack()
  }

  return (
    <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      <AtNavBar onClickLeftIcon={handleBack} title="智能驾驶" leftIconType="chevron-left" />
      <View className="container__list">
        {jobList.map(item => (
          <JobCard key={item.id} card={item} />
        ))}
      </View>
    </View>
  )
}

export default connect(({ common, classDetails, loading }) => ({
  common,
  classDetails,
  loading
}))(ClassDetails)
