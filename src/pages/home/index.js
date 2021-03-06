import Taro, { useDidShow, useReachBottom, useShareAppMessage } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import CompanyPart from '@components/page-components/company-part'
import RecommendPart from '@components/page-components/recommend-part'
import HotProducts from '@components/page-components/hot-products'
import SearchPart from '@components/page-components/search-part'
import wxLogin from '@utils/wxLogin'
import './index.less'

const Index = props => {
  const {
    dispatch,
    home: { bannerList, companyCardList, hotList, pageSize, page, hasNextPage }
  } = props

  useDidShow(() => {
    getBanner()
    getRecommend()
    getHotList()
  }, [])

  useReachBottom(() => {
    getHotList()
  })

  useShareAppMessage(res => {
    return {
      title: 'Enstar盈企达',
      path: 'pages/home/index'
    }
  })

  const handleImgJump = url => {
    // 点击banner跳转
    console.log(url, 'banner jump to url')
  }

  const getBanner = () => {
    dispatch({
      type: 'home/effectsBannerList',
      payload: {}
    })
  }

  const getRecommend = () => {
    dispatch({
      type: 'home/effectsRecommend',
      payload: {}
    })
  }

  const getHotList = () => {
    if (hasNextPage) {
      dispatch({
        type: 'home/effectsHot',
        payload: {
          pageSize,
          page
        }
      })
    }
  }

  return (
    <View className="container">
      {/* 头部搜索栏 */}
      <SearchPart className="search">
        {/* <View className="search__local">
          <Image
            className="search__local__image"
            src={require('@static/images/home/local.png')}
            mode="aspectFill"
          ></Image>
          <Text className="search__local__area">上海</Text>
        </View> */}
      </SearchPart>

      {/* banner */}
      <Swiper
        className="banner"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay
        interval={3000}
      >
        {bannerList.map(item => {
          return (
            <SwiperItem className="banner__item" key={item.id}>
              <Image
                className="banner__item__img"
                src={item.imgPath}
                mode="widthFix"
                onClick={() => handleImgJump(item.jumpPath)}
              />
            </SwiperItem>
          )
        })}
      </Swiper>

      {/* 推荐公司列表 */}
      {companyCardList.length > 0 && (
        <CompanyPart title={'星推荐'} extraText={'>>更多'} cardList={companyCardList} />
      )}

      {/* 热门产品 */}
      <HotProducts title={'热门产品'} hotList={hotList} />

      {/* 推荐产品 */}
      {/* <RecommendPart title={'推荐产品'} cardList={recommendCardList} /> */}
    </View>
  )
}

Index.config = {
  enableShareAppMessage: true
}
export default connect(({ common, home }) => ({
  common,
  home
}))(Index)
