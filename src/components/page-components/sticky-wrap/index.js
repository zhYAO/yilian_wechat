// base
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// less
import './index.less'
import { createIntersectionObserver } from '@crossplatform/apiservice/WXMLnodes'
import { getGlobalData } from '@configuration/globaldata'

/**
 *  StickyWrap 吸顶组件 需要一开始就指定高度
 *  @params
 *  style Object
 *  idName String
 *  stikyWrapId String
 *
 * */
class StickyWrap extends Component {
  state = {
    fixed: false
  }

  componentWillMount() {
    // onLoad
  }

  componentDidMount() {
    // onready
    this.doFlyFunc()
  }

  componentDidShow() {
    // onshow
  }

  componentDidHide() {
    // onhide
  }

  componentWillUnmount() {
    // onUnload
  }

  doFlyFunc() {
    const { idName, stikyWrapId, height, fixTop } = this.props
    const { navBarPaddingTop } = getGlobalData()
    let envpayload
    if (process.env.TARO_ENV == 'h5') {
      envpayload = {
        top: -1 * (height + fixTop + navBarPaddingTop),
        stikyWrapId
      }
    } else {
      envpayload = {
        top: -1 * (height + fixTop + navBarPaddingTop)
      }
    }
    createIntersectionObserver(this.$scope)
      .relativeToViewport({
        ...envpayload
      })
      .observe(`#${idName}`, ({ intersectionRatio, boundingClientRect: { top } = {} } = {}) => {
        if (intersectionRatio <= 0 && top <= height * 2) {
          if (!this.state.fixed) {
            this.setState({
              fixed: true
            })
          }
        } else {
          if (this.state.fixed) {
            this.setState({
              fixed: false
            })
          }
        }
      })
  }

  render() {
    const { style = {}, idName = 'stickywrap', height = 200, fixTop = 0 } = this.props
    const { navBarPaddingTop } = getGlobalData()
    const { fixed = false } = this.state
    const combinestyle = {
      ...style,
      height: height + 'px'
    }
    return (
      <View className="StickyWrap_id00427" id={idName} style={combinestyle || {}}>
        <View
          className="fixedwrap"
          style={
            fixed
              ? { position: 'fixed', top: `${fixTop + navBarPaddingTop}px` }
              : { position: 'static' }
          }
        >
          {this.props.children}
        </View>
      </View>
    )
  }
}

StickyWrap.defaultProps = {
  style: {},
  idName: 'stickywrap',
  stikyWrapId: '',
  fixTop: 0,
  height: 200
}

export default StickyWrap
