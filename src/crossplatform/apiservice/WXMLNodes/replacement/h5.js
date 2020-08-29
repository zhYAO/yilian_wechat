import { Throttle } from '../../../../utils/lodashmin/riverclosure'
import { getGlobalData } from '../../../../configuration/globaldata'

const CreateIntersectionObserver = () => {
  return {
    relativeToViewport: ({ top, bottom, left, right, stikyWrapId }) => {
      return {
        observe: (ele, callback) => {
          const element = document.querySelector(ele)
          const ThrottleFn = new Throttle(
            () => {
              const res = element.getBoundingClientRect()
              let datapayload = {
                position:
                  top || top === 0
                    ? 'top'
                    : bottom || bottom === 0
                    ? 'bottom'
                    : left || left === 0
                    ? 'left'
                    : right || right === 0
                    ? 'right'
                    : 'top',
                value: top || bottom || left || right || 0
              }
              let returnres = {}
              let topValue = res[datapayload.position] - datapayload.value
              returnres.intersectionRatio = topValue
              returnres.boundingClientRect = {
                top: topValue
              }
              callback && callback(returnres)
            },
            100,
            200
          )
          let scrollEle = stikyWrapId
            ? document.querySelector(`#${stikyWrapId}`)
            : document.querySelector(`.taro-tabbar__panel`)
          scrollEle.addEventListener('scroll', () => {
            ThrottleFn.start()
          })
        }
      }
    },
    relativeTo: () => {}
  }
}

export const createSelectorQueryFn = () => {
  let result = []
  return {
    select: ele => {
      let element = document.querySelector(ele)
      return {
        boundingClientRect: () => {
          let { top, right, bottom, left } = element.getBoundingClientRect()
          result.push({
            top,
            right,
            bottom,
            left
          })
        }
      }
    },
    selectViewport: () => {
      return {
        scrollOffset: () => {
          const className = getGlobalData('h5-wrap-classname')
          const element = document.querySelector(className)
          const scrollTop = element.scrollTop
          result.push({ scrollTop: scrollTop })
        }
      }
    },
    exec: callback => {
      callback && callback(result)
    }
  }
}

module.exports = {
  CreateIntersectionObserver,
  createSelectorQueryFn
}
