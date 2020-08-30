import Taro, { useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtFloatLayout, AtTextarea } from 'taro-ui'
import './index.less'

const SharePop = props => {
  const { isOpened = false, onClose } = props
  const [shareText, setShareText] = useState('')

  const handleClose = () => {
    onClose()
  }

  const handleChange = value => {
    setShareText(value)
  }

  return (
    <View style={{ display: isOpened ? 'unset' : 'none' }}>
      <AtFloatLayout isOpened={isOpened} onClose={handleClose}>
        <View className="container">
          <View className="container__title">
            <View className="container__title__text">转发动态</View>
            <View className="container__title__share">立即转发</View>
          </View>
          <View className="container__content">
            <AtTextarea
              value={shareText}
              onChange={handleChange}
              maxLength={200}
              placeholder="热烈祝贺快仓发布新品，谈合作的小伙伴快到碗里来……"
            />

            <View className="container__content__company">
              <Image className="company__img"></Image>
              <View className="company__content">
                <View className="company__content__name">上海快仓智能科技有限公司</View>
                <View className="company__content__desc">
                  前程似锦，踏梦归来 快仓智能机器人为你保驾护航
                </View>
              </View>
            </View>
          </View>

          <View className="container__gap"></View>
          <View className="container__cancel">取消</View>
        </View>
      </AtFloatLayout>
    </View>
  )
}

SharePop.defaultProps = {
  isOpened: false
}

export default SharePop
