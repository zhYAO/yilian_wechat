import Taro from '@tarojs/taro'
import { View, Text, Video, Image, ScrollView } from '@tarojs/components'
import { setClipboardData } from '@crossplatform/apiservice/clipboard'
import './index.less'

const CompanyDetailInfo = props => {
  const { companyDetail, customerList, handleFullScreen } = props

  const handleFileName = (str = '') => {
    const arr = str.split('/')
    if (arr.length) {
      return arr[arr.length - 1]
    }
    return ''
  }

  const handleCopyFile = () => {
    setClipboardData({
      data: companyDetail.documentation,
      success(res) {}
    })
  }

  return (
    <View className="container">
      <View className="container__item">
        <View className="container__item__title">
          <View className="title__line"></View>
          <View className="title__text">公司简述</View>
        </View>
        <View className="container__item__sketch">{companyDetail.profile}</View>
      </View>

      <View className="container__item">
        <View className="container__item__title">
          <View className="title__line"></View>
          <View className="title__text">融资情况</View>
        </View>
        <View className="container__item__list">
          <View className="list__item">
            <Text className="list__item__title">融资阶段：</Text>
            <Text className="list__item__desc">{companyDetail.financeStage}</Text>
          </View>
          <View className="list__item">
            <Text className="list__item__title">公司估值：</Text>
            <Text className="list__item__desc">{companyDetail.financeAmount}</Text>
          </View>
          <View className="list__item">
            <Text className="list__item__title">投资：</Text>
            <Text className="list__item__desc">{companyDetail.investment}</Text>
          </View>
        </View>
      </View>

      {companyDetail.propagandaVideo && (
        <View className="container__item">
          <View className="container__item__title">
            <View className="title__line"></View>
            <View className="title__text">宣传视频</View>
          </View>
          <View className="container__item__video">
            <Video
              className="video"
              src={companyDetail.propagandaVideo}
              onFullscreenChange={handleFullScreen}
              direction={0}
            ></Video>
          </View>
        </View>
      )}

      <View className="container__item">
        <View className="container__item__title">
          <View className="title__line"></View>
          <View className="title__text">公司客户</View>
        </View>

        <ScrollView className="container__item__scroll" scroll-x>
          <View className="container__item__card" scroll-x>
            {customerList.map((item, index) => {
              return (
                <View className="card__item" key={item.id}>
                  <Image
                    src={item.imgPath}
                    alt="图片加载失败"
                    className="card__item__img"
                    mode="aspectFit"
                  />
                  <Text className="card__item__name">{item.customerName}</Text>
                </View>
              )
            })}
          </View>
        </ScrollView>
      </View>

      <View className="container__item">
        <View className="container__item__title">
          <View className="title__line"></View>
          <View className="title__text">公司介绍文档</View>
        </View>
        <View className="container__item__file" onClick={handleCopyFile}>
          {handleFileName(companyDetail.documentation)}
        </View>
      </View>
    </View>
  )
}

CompanyDetailInfo.defaultProps = {
  companyDetail: {},
  customerList: []
}

export default CompanyDetailInfo
