import Taro, { useEffect } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import CompanyPart from '@components/page-components/company-part'
import RecommendPart from '@components/page-components/recommend-part'
import SearchPart from '@components/page-components/search-part'
import './index.less'

const Index = props => {
  const {
    dispatch,
    common: { navBarPaddingTop },
    home: { searchData, bannerList, companyCardList, recommendCardList }
  } = props

  const handleChange = val => {
    console.log(val, 'searchVal')
    dispatch({
      type: 'home/updateState',
      payload: {
        searchData: val
      }
    })
  }

  const handleImgJump = url => {
    // 点击banner跳转
    console.log(url, 'banner jump to url')
  }

  return (
    <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      {/* 头部搜索栏 */}
      <SearchPart />

      {/* banner */}
      <Swiper
        className="banner"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
      >
        {bannerList.map(item => {
          return (
            <SwiperItem className="banner__item" key={item.id}>
              <Image
                className="banner__item__img"
                src={item.picUrl}
                mode="widthFix"
                onClick={() => handleImgJump(item.url)}
              />
            </SwiperItem>
          )
        })}
      </Swiper>

      {/* 推荐公司列表 */}
      <CompanyPart title={'小易推荐'} extraText={'>>更多'} cardList={companyCardList} />

      {/* 热门产品 */}
      <RecommendPart title={'推荐产品'} cardList={recommendCardList} />

      {/* 推荐产品 */}
      <RecommendPart title={'推荐产品'} cardList={recommendCardList} />
    </View>
  )
}
//全局样式继承 你可以关掉
// Index.options = {
//   addGlobalClass: true
// }
export default connect(({ common, home }) => ({
  common,
  home
}))(Index)
