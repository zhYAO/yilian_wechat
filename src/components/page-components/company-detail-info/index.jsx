import Taro from '@tarojs/taro'
import { View, Text, Video, Image } from '@tarojs/components'
import './index.less'

const CompanyDetailInfo = props => {
  return (
    <View className="container">
      <View className="container__item">
        <View className="container__item__title">
          <View className="title__line"></View>
          <View className="title__text">公司简述</View>
        </View>
        <View className="container__item__sketch">
          快仓公司成立于2014年，专注于提供智
          储解决方案，公司以“成为智能仓储最佳践行者”为己任，不仅集仓储机器人的研发、生产、销售、项目实施、管理、服务为一体，更注重于在智能仓储系统这个国内空白的领域进行深入研究及实际运行。
        </View>
      </View>

      <View className="container__item">
        <View className="container__item__title">
          <View className="title__line"></View>
          <View className="title__text">融资情况</View>
        </View>
        <View className="container__item__list">
          <View className="list__item">
            <Text className="list__item__title">融资阶段：</Text>
            <Text className="list__item__desc">F轮</Text>
          </View>
          <View className="list__item">
            <Text className="list__item__title">公司估值：</Text>
            <Text className="list__item__desc">10亿美金</Text>
          </View>
          <View className="list__item">
            <Text className="list__item__title">投资：</Text>
            <Text className="list__item__desc">IDG资本</Text>
          </View>
        </View>
      </View>

      <View className="container__item">
        <View className="container__item__title">
          <View className="title__line"></View>
          <View className="title__text">宣传视频</View>
        </View>
        <View className="container__item__video">
          <Video className="video"></Video>
        </View>
      </View>

      <View className="container__item">
        <View className="container__item__title">
          <View className="title__line"></View>
          <View className="title__text">公司客户</View>
        </View> 
        <View className="container__item__card">
          <View className="card__item">
            <Image src="" alt="图片加载失败" className="card__item__img" />
            <Text className="card__item__name"> 快仓公司</Text>
          </View>
          <View className="card__item">
            <Image src="" alt="图片加载失败" className="card__item__img" />
            <Text className="card__item__name"> 快仓公司</Text>
          </View>
          <View className="card__item">
            <Image src="" alt="图片加载失败" className="card__item__img" />
            <Text className="card__item__name"> 快仓公司</Text>
          </View>
          <View className="card__item">
            <Image src="" alt="图片加载失败" className="card__item__img" />
            <Text className="card__item__name"> 快仓公司</Text>
          </View>
        </View>
      </View>

      <View className="container__item">
        <View className="container__item__title">
          <View className="title__line"></View>
          <View className="title__text">公司介绍文档</View>
        </View>
        <View className="container__item__file">
        </View>
      </View>

    </View>
  )
}

CompanyDetailInfo.defaultProps = {}

export default CompanyDetailInfo
