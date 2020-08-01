import Taro, { useEffect } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import MineNavigator from '@components/page-components/mine-navigator'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import './index.less'

const Mine = props => {
  const {
    dispatch,
    common: {
      userInfo: { nickname, userAventor },
      navBarPaddingTop
    },
    mine: {
      pageTitle,
      userInfo: {
        name,
        integral,
        dynamicCount,
        attentionCount,
        favoriteCount,
        fansCount,
        companyId
      }
    },
    loading
  } = props

  useEffect(() => {
    getUserInfo()
  }, [])

  const handleNavigate = (pageUrl, parmas) => {
    navigateTo({
      url: `${pagejumplist[pageUrl].path}${parmas ? parmas : ''}`
    })
  }

  const getUserInfo = () => {
    dispatch({
      type: 'mine/effectsLabelList',
      payload: {}
    })
  }

  return (
    <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      <View className="container__pageTitle">{pageTitle}</View>
      <View className="container__user">
        <View className="container__user__info">
          <Image
            className="info__aventor"
            src={
              userAventor ||
              'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180'
            }
          ></Image>
          <View className="info__name">{name || nickname || '没得法士大夫'}</View>
          <View className="info__score">我的积分 {integral}</View>
          <View className="info__myInfo" onClick={() => handleNavigate('my-info')}>
            我的资料
          </View>
        </View>
        <View className="container__user__options">
          <View className="options__item">
            <View className="options__item__num">{dynamicCount}</View>
            <View className="options__item__name">动态</View>
          </View>
          <View className="options__item" onClick={() => handleNavigate('my-focus')}>
            <View className="options__item__num">{attentionCount}</View>
            <View className="options__item__name">关注</View>
          </View>
          <View className="options__item">
            <View className="options__item__num">{favoriteCount}</View>
            <View className="options__item__name">收藏</View>
          </View>
          <View className="options__item">
            <View className="options__item__num">{fansCount}</View>
            <View className="options__item__name">粉丝</View>
          </View>
        </View>
        <View className="container__user__card">
          <View
            className="card__item"
            onClick={() => handleNavigate('company-detail', `?id=${companyId}`)}
          >
            <Image
              className="card__item__img"
              src="https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180"
            ></Image>
            <View className="card__item__text">公司主页</View>
          </View>
          <View className="card__item">
            <Image
              className="card__item__img"
              src="https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180"
            ></Image>
            <View className="card__item__text">我的动态</View>
          </View>
          <View className="card__item">
            <Image
              className="card__item__img"
              src="https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180"
            ></Image>
            <View className="card__item__text">我的收藏</View>
          </View>
          <View className="card__item" onClick={() => handleNavigate('my-focus')}>
            <Image
              className="card__item__img"
              src="https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180"
            ></Image>
            <View className="card__item__text">我的关注</View>
          </View>
        </View>
      </View>

      <View className="container__nav">
        <MineNavigator
          iconSrc={
            'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180'
          }
          title="我参与的"
        />
      </View>
      <View className="container__nav">
        <MineNavigator
          iconSrc={
            'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180'
          }
          title="关于我们"
        />
      </View>
      <View className="container__nav">
        <MineNavigator
          iconSrc={
            'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180'
          }
          title="意见反馈"
        />
      </View>

      <View className="container__logout">退出登录</View>
    </View>
  )
}

export default connect(({ common, mine, loading }) => ({
  mine,
  loading,
  common
}))(Mine)
