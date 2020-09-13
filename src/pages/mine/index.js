import Taro, { useDidShow, useState } from '@tarojs/taro'
import { View, Image, Block, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import MineNavigator from '@components/page-components/mine-navigator'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import { removeStorageSync, setStorageSync } from '@crossplatform/apiservice/storage'
import wxLogin from '@utils/wxLogin'
import { showToast } from '@crossplatform/apiservice/toast'
import { getGlobalData } from '@configuration/globaldata'
import './index.less'

const Mine = props => {
  const {
    dispatch,
    common: {
      userInfo: { nickName, avatarUrl },
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
        companyId,
        id,
        imgPath,
        identity
      }
    },
    loading
  } = props

  const { navBarPaddingTop } = getGlobalData()

  const [isLogin, setIsLogin] = useState(!!nickName)

  useDidShow(() => {
    getUserInfo()
  }, [])

  const handleNavigate = (pageUrl, parmas) => {
    console.log(pageUrl, 'pageUrlpageUrlpageUrl')
    navigateTo({
      url: `${pagejumplist[pageUrl].path}${parmas ? parmas : ''}`
    })
  }

  const getUserInfo = () => {
    dispatch({
      type: 'mine/effectsUserInfo',
      payload: {}
    }).then(() => {
      setStorageSync('identity', props.mine.userInfo.identity)
      dispatch({
        type: 'common/effectsUpdate',
        payload: { identity }
      })
    })
  }

  const setUserInfo = ({ nickName: name, gender: sex, avatarUrl: imgPath }) => {
    dispatch({
      type: 'mine/effectsUserModify',
      payload: { name, sex, imgPath }
    })
  }

  const logout = () => {
    removeStorageSync('token')
    removeStorageSync('openId')
    dispatch({
      type: 'common/effectsUpdate',
      payload: { token: '' }
    })
    setIsLogin(false)
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
      wxLogin.doLogin().then(data => {
        dispatch({
          type: 'common/effectsUpdate',
          payload: { ...data }
        })
        if (!name) {
          setUserInfo(userInfo)
        }
        setIsLogin(true)
      })
    }
  }

  const goCompanyPage = () => {
    if (companyId) {
      handleNavigate('company-detail', `?id=${companyId}&isMine=1`)
    } else {
      showToast({
        title: '尚未绑定公司'
      })
    }
  }

  return (
    <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      <View className="container__pageTitle">{pageTitle}</View>
      {!!isLogin && (
        <Block>
          <View className="container__user">
            <Image
              className="container__user__bg"
              src={require('@static/images/common/bg.png')}
              mode="aspectFit"
            />
            <View className="container__user__info">
              <Image className="info__aventor" src={imgPath || avatarUrl}></Image>
              <View className="info__name">{name || nickName || ''}</View>
              <View className="info__score">我的积分 {integral || 0}</View>
              <View className="info__myInfo" onClick={() => handleNavigate('my-info')}>
                我的资料
              </View>
            </View>
            <View className="container__user__options">
              <View
                className="options__item"
                onClick={() => handleNavigate('personal-homepage', `?id=${id}&isMine=1`)}
              >
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
              <View className="options__item" onClick={() => handleNavigate('my-fans-page')}>
                <View className="options__item__num">{fansCount}</View>
                <View className="options__item__name">粉丝</View>
              </View>
            </View>
            <View className="container__user__card">
              <View className="card__item" onClick={goCompanyPage}>
                <Image
                  className="card__item__img"
                  src={require('@static/images/mine/company_home.png')}
                ></Image>
                <View className="card__item__text">公司主页</View>
              </View>
              <View
                className="card__item"
                onClick={() => handleNavigate('personal-homepage', `?id=${id}&isMine=1`)}
              >
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
            <MineNavigator
              iconSrc={require('@static/images/mine/join.png')}
              title="我参与的"
              onJump={() => handleNavigate('my-takepart')}
            />
          </View>
          <View className="container__nav">
            <MineNavigator
              iconSrc={require('@static/images/mine/about.png')}
              onJump={() => handleNavigate('about-us')}
              title="关于我们"
            />
          </View>
          {/* <View className="container__nav">
            <MineNavigator iconSrc={require('@static/images/mine/feedback.png')} title="意见反馈" />
          </View> */}

          <View className="container__logout" onClick={logout}>
            退出登录
          </View>
        </Block>
      )}

      {!isLogin && (
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
