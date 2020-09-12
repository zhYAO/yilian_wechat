import Taro, { useState } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { AtFloatLayout, AtTextarea } from 'taro-ui'
import ProductCardFav from '@components/page-components/product-card-fav'
import DynamicCardFav from '@components/page-components/dynamic-card-fav'
import PositionCardFav from '@components/page-components/position-card-fav'
import './index.less'

const SharePop = props => {
  const { isOpened = false, onClose, onTextChange, type, detail } = props
  const [shareText, setShareText] = useState('')

  const handleClose = () => {
    onClose()
  }

  const handleChange = value => {
    setShareText(value)
    onTextChange(value || '')
  }

  return (
    <View style={{ display: isOpened ? 'unset' : 'none' }}>
      <AtFloatLayout isOpened={isOpened} onClose={handleClose}>
        <View className="container">
          <View className="container__title">
            <View className="container__title__text">转发动态</View>
            <Button className="container__title__share" openType="share">
              立即转发
            </Button>
          </View>
          <View className="container__content">
            <AtTextarea
              value={shareText}
              onChange={handleChange}
              maxLength={100}
              placeholder="请填写分享说明"
            />

            {type === 'COMPANY' && (
              <View className="container__content__company">
                <Image className="company__img" src={detail.logoPath}></Image>
                <View className="company__content">
                  <View className="company__content__name">{detail.name}</View>
                  <View className="company__content__desc">{detail.theme}</View>
                </View>
              </View>
            )}

            {type === 'PRODUCT' && (
              <View className="container__content__other">
                <ProductCardFav card={detail} noBtn={true} />
              </View>
            )}

            {type === 'DYNAMIC' && (
              <View className="container__content__other">
                <DynamicCardFav card={detail} noBtn={true} />
              </View>
            )}

            {type === 'POSITION' && (
              <View className="container__content__other">
                <PositionCardFav card={detail} noBtn={true} />
              </View>
            )}
          </View>

          <View className="container__gap"></View>
          <View className="container__cancel" onClick={handleClose}>
            取消
          </View>
        </View>
      </AtFloatLayout>
    </View>
  )
}

SharePop.defaultProps = {
  isOpened: false
}

export default SharePop
