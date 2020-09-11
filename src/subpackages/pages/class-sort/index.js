import Taro, { useDidShow, useState } from '@tarojs/taro'
import { View, MovableArea, MovableView, ScrollView } from '@tarojs/components'
import { getGlobalData } from '@configuration/globaldata'
import { connect } from '@tarojs/redux'
import ClassCard from '@components/page-components/class-card'
import NavigationBar from '@components/page-components/navigation-bar'
import './index.less'

const ClassSort = props => {
  const {
    dispatch,
    classSort: { classList },
    loading
  } = props

  const { navBarPaddingTop } = getGlobalData()

  const [navTopHeight] = useState(navBarPaddingTop + 44)

  const [movableViewInfo, setMovableViewInfo] = useState({
    y: 0,
    showClass: 'none',
    data: {}
  })
  const [pageInfo, setPageInfo] = useState({
    rowHeight: 71.5,
    scrollHeight: `calc(100vh - ${navTopHeight}px)`,
    startIndex: null,
    scrollY: true,
    readyPlaceIndex: null,
    startY: 0,
    selectedIndex: null
  })

  useDidShow(() => {
    getLabel()
  }, [])

  const getLabel = () => {
    dispatch({
      type: 'classSort/effectsLabelList',
      payload: {}
    })
  }

  const changeSort = (preIndex, index) => {
    dispatch({
      type: 'classSort/effectsChangeSort',
      payload: {
        resourceLabelId: classList[preIndex].labelId,
        targetLabelId: classList[index].labelId
      }
    })
  }

  const handleTouchStart = (event, index) => {
    console.log('获取到的元素为', classList[index])
    // 初始化页面数据
    setPageInfo({
      rowHeight: 71.5,
      scrollHeight: `calc(100vh - ${navTopHeight}px)`,
      startIndex: index,
      scrollY: false,
      readyPlaceIndex: index,
      startY: event.touches[0].clientY,
      selectedIndex: index
    })

    setMovableViewInfo({
      y: pageInfo.startY - pageInfo.rowHeight / 2,
      data: classList[index],
      showClass: 'none'
    })
  }

  const handleTouchMove = event => {
    let optionList = [...classList]
    let pageInfoNew = { ...pageInfo }
    let movableViewInfoNew = { ...movableViewInfo }
    // 计算拖拽距离
    let movedDistance = event.touches[0].clientY - pageInfoNew.startY
    movableViewInfoNew.y =
      pageInfoNew.startY - pageInfoNew.rowHeight / 2 + movedDistance - navTopHeight

    // 修改预计放置位置
    let movedIndex = parseInt(movedDistance / pageInfoNew.rowHeight)
    let readyPlaceIndex = pageInfoNew.startIndex + movedIndex
    if (readyPlaceIndex < 0) {
      readyPlaceIndex = 0
    } else if (readyPlaceIndex >= optionList.length) {
      readyPlaceIndex = optionList.length - 1
    }

    if (readyPlaceIndex != pageInfoNew.selectedIndex) {
      let selectedData = optionList[pageInfoNew.selectedIndex]

      optionList.splice(pageInfoNew.selectedIndex, 1)
      optionList.splice(readyPlaceIndex, 0, selectedData)
      pageInfoNew.selectedIndex = readyPlaceIndex
    }
    // 移动movableView
    pageInfoNew.readyPlaceIndex = readyPlaceIndex

    setMovableViewInfo({ ...movableViewInfo, ...movableViewInfoNew, showClass: 'inline' })
    setPageInfo({ ...pageInfo, ...pageInfoNew })

    dispatch({
      type: 'classSort/updateState',
      payload: {
        classList: optionList
      }
    })
  }

  const handleTouchEnd = event => {
    // 重置页面数据
    let pageInfoNew = pageInfo
    // 执行位置排序操作
    changeSort(pageInfoNew.startIndex, pageInfoNew.readyPlaceIndex)

    pageInfoNew.readyPlaceIndex = null
    pageInfoNew.startY = null
    pageInfoNew.selectedIndex = null
    pageInfoNew.startIndex = null
    pageInfoNew.scrollY = true
    // 隐藏movableView
    movableViewInfo.showClass = 'none'

    setMovableViewInfo(movableViewInfo)
    setPageInfo({ ...pageInfo, ...pageInfoNew })
  }

  return (
    <View className="container">
      <NavigationBar title="排序" hasLeftIcon={true} />

      <View style="position: relative;">
        <MovableArea
          className="container__movable"
          style={{
            display: movableViewInfo.showClass,
            height: `${pageInfo.scrollHeight}`
          }}
        >
          <MovableView
            class="movable-row"
            out-of-bounds="true"
            damping="999"
            style={{ height: `${pageInfo.rowHeight}px` }}
            direction="vertical"
            y={movableViewInfo.y}
          >
            <ClassCard card={movableViewInfo.data} />
          </MovableView>
        </MovableArea>

        <ScrollView
          className="container__list"
          scroll-y={pageInfo.scrollY}
          style={{
            height: `${pageInfo.scrollHeight}`
          }}
        >
          {classList.map((item, index) => (
            <View key={item.id} className="container__list__item">
              <ClassCard
                card={item}
                index={index}
                onTouchStartCard={e => handleTouchStart(e, index)}
                onTouchMoveCard={handleTouchMove}
                onTouchEndCard={handleTouchEnd}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}
export default connect(({ common, classSort, loading }) => ({
  common,
  classSort,
  loading
}))(ClassSort)
