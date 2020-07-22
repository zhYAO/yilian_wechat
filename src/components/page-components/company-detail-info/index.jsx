import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
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
        <View className="container__item__sketch">
          快仓公司成立于2014年，专注于提供智
          储解决方案，公司以“成为智能仓储最佳践行者”为己任，不仅集仓储机器人的研发、生产、销售、项目实施、管理、服务为一体，更注重于在智能仓储系统这个国内空白的领域进行深入研究及实际运行。
        </View>
      </View>
    </View>
  )
}

CompanyDetailInfo.defaultProps = {}

export default CompanyDetailInfo
