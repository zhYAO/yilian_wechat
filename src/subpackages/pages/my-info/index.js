import Taro, { useState, useDidShow, getUserInfo } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { AtNavBar, AtList, AtListItem, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { navigateBack, navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import './index.less'

const MyInfo = props => {
  const {
    dispatch,
    myInfo: {
      userInfo: {
        name = '',
        sex = '',
        email = '',
        weChat = '',
        mobile = '',
        companyName = '',
        job = '',
        theme = '',
        labels = []
      }
    },
    loading,
    common: {
      navBarPaddingTop,
      userInfo: { nickName, avatarUrl }
    }
  } = props

  const [isOpened, setIsOpened] = useState(false)
  const [genderIsOpen, setGenderIsOpen] = useState(false)

  useDidShow(() => {
    getUserInfo()
  })

  const getUserInfo = () => {
    dispatch({
      type: 'myInfo/effectsUserInfo'
    })
  }

  const handleBack = () => {
    navigateBack()
  }

  const handleJump = (url, params) => {
    navigateTo({
      url: `${pagejumplist[url].path}?${params}`
    })
  }

  const handleGender = gender => {
    return gender === 1 ? '男' : '女'
  }

  const handleIndustry = labels => {
    return labels.map(item => item.label)
  }

  const handleOpen = () => {
    setIsOpened(!isOpened)
  }

  const handleShowGender = () => {
    setGenderIsOpen(!genderIsOpen)
  }

  const handleSelectGender = gender => {
    dispatch({
      type: 'myInfo/effectsModify',
      payload: {
        sex: gender
      }
    }).then(() => {
      handleShowGender()
      getUserInfo()
    })
  }

  return (
    <View className="container" style={{ marginTop: navBarPaddingTop + 'px' }}>
      <AtNavBar onClickLeftIcon={handleBack} title="我的资料" leftIconType="chevron-left" />

      <View className="container__header">
        <Image
          className="container__header__img"
          src={
            avatarUrl ||
            'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180'
          }
        />
      </View>

      <View className="container__list">
        <AtListItem
          title="昵称"
          extraText={name}
          arrow="right"
          onClick={() => handleJump('common-edit', `key=name&value=${name}`)}
        />
        <AtListItem
          title="性别"
          extraText={handleGender(sex)}
          onClick={handleShowGender}
          arrow="right"
        />
        <AtListItem
          title="微信号"
          extraText={weChat}
          arrow="right"
          onClick={() => handleJump('common-edit', `key=weChat&value=${weChat}`)}
        />
        <AtListItem
          title="绑定手机号"
          extraText={mobile}
          arrow="right"
          onClick={() => handleJump('common-edit', `key=mobile&value=${mobile}`)}
        />
        <AtListItem
          title="邮箱"
          extraText={email}
          arrow="right"
          onClick={() => handleJump('common-edit', `key=email&value=${email}`)}
        />
        <AtListItem title="公司" extraText={companyName} arrow="right" />
        <AtListItem
          title="职位"
          extraText={job}
          arrow="right"
          onClick={() => handleJump('common-edit', `key=job&value=${job}`)}
        />
      </View>

      <View className="container__list">
        <AtListItem
          title="关注领域"
          arrow="right"
          onClick={() => handleJump('industry-label')}
          extraText={handleIndustry(labels)}
        />
        <AtListItem
          title="座右铭"
          extraText={theme}
          arrow="right"
          onClick={() => handleJump('common-edit', `key=theme&value=${theme}`)}
        />
      </View>

      {/* <AtActionSheet isOpened={isOpened} onClose={handleOpen} onCancel={handleOpen}>
        <AtActionSheetItem>
          <Button openType="getPhoneNumber" onGetphonenumber="getPhoneNumber">
            获取微信绑定手机号
          </Button>
        </AtActionSheetItem>
        <AtActionSheetItem onClick={() => handleJump('common-edit', `key=mobile&value=${mobile}`)}>
          手动填写手机号
        </AtActionSheetItem>
      </AtActionSheet> */}

      <AtActionSheet isOpened={genderIsOpen}>
        <AtActionSheetItem onClick={() => handleSelectGender(1)}>男</AtActionSheetItem>
        <AtActionSheetItem onClick={() => handleSelectGender(2)}>女</AtActionSheetItem>
      </AtActionSheet>
    </View>
  )
}
export default connect(({ common, myInfo, loading }) => ({
  common,
  myInfo,
  loading
}))(MyInfo)
