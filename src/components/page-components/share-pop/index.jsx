import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { AtFloatLayout, AtTextarea } from 'taro-ui'
import ProductCardFav from '@components/page-components/product-card-fav'
import DynamicCardFav from '@components/page-components/dynamic-card-fav'
import PositionCardFav from '@components/page-components/position-card-fav'
import { shareTimesRequest } from '@service/info-controller'
import './index.less'

const SharePop = props => {
  const { isOpened = false, onClose, type, detail } = props
  const [shareText, setShareText] = useState('')

  useEffect(() => {
    setShareText('')
  }, [useEffect])

  const handleClose = () => {
    onClose()
    setShareText('')
  }

  const handleChange = value => {
    setShareText(value)
  }

  const handleShare = () => {
    // 1:公司 2：视频 3：职位 4：产品  5：动态
    let params = {}
    switch (type) {
      case 'COMPANY':
        params.type = 1
        params.foreignId = detail.id
        break
      case 'VIDEO':
        params.type = 2
        params.foreignId = detail.id
        break
      case 'POSITION':
        params.type = 3
        params.foreignId = detail.id
        break
      case 'PRODUCT':
        params.type = 4
        params.foreignId = detail.id
        break
      case 'DYNAMIC':
        params.type = 5
        params.foreignId = detail.id
        break
    }
    onClose()
    shareTimesRequest(params)
  }

  return (
    <View style={{ display: isOpened ? 'unset' : 'none' }}>
      <AtFloatLayout isOpened={isOpened} onClose={handleClose}>
        <View className="container">
          <View className="container__title">
            <View className="container__title__text">转发动态</View>
            <Button
              className="container__title__share"
              openType="share"
              data-type={type}
              data-detail={detail}
              data-value={shareText}
              onClick={handleShare}
            >
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
