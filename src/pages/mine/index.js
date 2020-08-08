import Taro, { useEffect } from '@tarojs/taro'
import { View, Image, Block, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import MineNavigator from '@components/page-components/mine-navigator'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import { removeStorageSync, setStorageSync } from '@crossplatform/apiservice/storage'
import wxLogin from '@utils/wxLogin'
import './index.less'

const Mine = props => {
  const {
    dispatch,
    common: {
      userInfo: { nickName, avatarUrl },
      navBarPaddingTop,
      token
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
      type: 'mine/effectsUserInfo',
      payload: {}
    })
  }

  const setUserInfo = ({ nickName: name, gender: sex }) => {
    dispatch({
      type: 'mine/effectsUserModify',
      payload: { name, sex }
    })
  }

  const logout = () => {
    removeStorageSync('token')
    removeStorageSync('openId')
    dispatch({
      type: 'common/effectsUpdate',
      payload: { token: '' }
    })
  }

  const handleGetUserInfo = e => {
    const { currentTarget } = e
    if (currentTarget.userInfo) {
      const userInfo = currentTarget.userInfo
      setStorageSync('userInfo', userInfo)

      dispatch({
        type: 'common/effectsUpdate',
        payload: { userInfo }
      })
      wxLogin.doLogin().then(({ openId, token }) => {
        dispatch({
          type: 'common/effectsUpdate',
          payload: { openId, token }
        })
        setUserInfo(userInfo)
      })
    }
  }

  return (
    <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      <View className="container__pageTitle">{pageTitle}</View>
      {!!nickName && (
        <Block>
          <View className="container__user">
            <View className="container__user__info">
              <Image className="info__aventor" src={avatarUrl}></Image>
              <View className="info__name">{name || nickName || '没得法士大夫'}</View>
              <View className="info__score">我的积分 {integral || 0}</View>
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
              <View className="options__item" onClick={() => handleNavigate('my-favorite')}>
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
                  src={require('@static/images/mine/company_home.png')}
                ></Image>
                <View className="card__item__text">公司主页</View>
              </View>
              <View className="card__item">
                <Image
                  className="card__item__img"
                  src={require('@static/images/mine/my_trends.png')}
                ></Image>
                <View className="card__item__text">我的动态</View>
              </View>
              <View className="card__item" onClick={() => handleNavigate('my-favorite')}>
                <Image
                  className="card__item__img"
                  src={require('@static/images/mine/my_favorite.png')}
                ></Image>
                <View className="card__item__text">我的收藏</View>
              </View>
              <View className="card__item" onClick={() => handleNavigate('my-focus')}>
                <Image
                  className="card__item__img"
                  src={require('@static/images/mine/my_focus.png')}
                ></Image>
                <View className="card__item__text">我的关注</View>
              </View>
            </View>
          </View>

          <View className="container__nav">
            <MineNavigator iconSrc={require('@static/images/mine/join.png')} title="我参与的" />
          </View>
          <View className="container__nav">
            <MineNavigator iconSrc={require('@static/images/mine/about.png')} title="关于我们" />
          </View>
          <View className="container__nav">
            <MineNavigator iconSrc={require('@static/images/mine/feedback.png')} title="意见反馈" />
          </View>

          <View className="container__logout" onClick={logout}>
            退出登录
          </View>
        </Block>
      )}

      {!nickName && (
        <Block>
          <Button
            className="container__login"
            openType="getUserInfo"
            onGetuserinfo={handleGetUserInfo}
          >
            <Image
              className="container__login__aventor"
              src={
                'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180'
              }
            ></Image>
            <Text className="container__login__text">登录/注册</Text>
          </Button>
          <View className="container__nav">
            <MineNavigator
              iconSrc={
                'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180'
              }
              title="意见反馈"
            />
          </View>
        </Block>
      )}
    </View>
  )
}

export default connect(({ common, mine, loading }) => ({
  mine,
  loading,
  common
}))(Mine)
