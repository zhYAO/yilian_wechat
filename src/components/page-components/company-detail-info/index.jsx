import Taro from '@tarojs/taro'
import { View, Text, Video, Image } from '@tarojs/components'
import './index.less'

const CompanyDetailInfo = props => {
  const { companyDetail, customerList, handleAttentionClick, handlePhoneCall, isMine } = props

  return (
    <View className="container">
      <View className="container__item">
        <View className="container__item__title">
          <View className="title__line"></View>
          <View className="title__text">{companyDetail.profile}</View>
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

      <View className="container__item">
        <View className="container__item__title">
          <View className="title__line"></View>
          <View className="title__text">宣传视频</View>
        </View>
        <View className="container__item__video">
          <Video className="video" src={companyDetail.propagandaVideo}></Video>
        </View>
      </View>

      <View className="container__item">
        <View className="container__item__title">
          <View className="title__line"></View>
          <View className="title__text">公司客户</View>
        </View>
        <View className="container__item__card">
          {customerList.map((item, index) => {
            return index < 4 ? (
              <View className="card__item" key={item.id}>
                <Image src={item.imgPath} alt="图片加载失败" className="card__item__img" />
                <Text className="card__item__name">{item.customerName}</Text>
              </View>
            ) : null
          })}
        </View>
      </View>

      <View className="container__item">
        <View className="container__item__title">
          <View className="title__line"></View>
          <View className="title__text">公司介绍文档</View>
        </View>
        <View className="container__item__file"></View>
      </View>

      {!isMine && (
        <View className="container__bottom">
          <Image
            className="container__bottom__img"
            src={require('@static/images/common/share__active.png')}
          />
          <View className="container__bottom__btn">
            <View className="btn" onClick={handlePhoneCall}>
              急速沟通
            </View>
            <View className="btn" onClick={() => handleAttentionClick(2)}>
              {companyDetail.isAttention ? '已关注' : '+ 关注'}
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

CompanyDetailInfo.defaultProps = {
  companyDetail: {},
  customerList: [],
  handleAttentionClick: () => {},
  handlePhoneCall: () => {}
}

export default CompanyDetailInfo
