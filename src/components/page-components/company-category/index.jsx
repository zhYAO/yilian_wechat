import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import { navigateTo } from '@crossplatform/apiservice/navigate'
import pagejumplist from '@configuration/pagejumplist.json'
import './index.less'

const CompanyCategory = props => {
  const { list = [] } = props

  const [listLenthArr, setListLenthArr] = useState([])
  useEffect(() => {
    setListLenthArr(new Array(Math.ceil(list.length / 8)).fill(''))
  }, [list])

  const handleClick = (id, label) => {
    navigateTo({
      url: `${pagejumplist['class-details'].path}?id=${id}&name=${label}`
    })
  }

  return (
    <View className="container">
      {/* <View className="container__grid"> */}
      <Swiper className="container__grid" circular>
        {listLenthArr.length > 0 &&
          listLenthArr.map((itemArr, indexArr) => {
            const newList = list.slice(8 * indexArr, 8 * (indexArr + 1))
            return (
              <SwiperItem key={indexArr}>
                {newList.map(item => {
                  return (
                    <View
                      className="container__grid__item"
                      key={item.id}
                      onClick={() => {
                        handleClick(item.labelId, item.label)
                      }}
                    >
                      <Image className="item__icon" src={item.imgPath} />
                      <Text className="item__title">{item.label}</Text>
                    </View>
                  )
                })}
              </SwiperItem>
            )
          })}
      </Swiper>
      {/* </View> */}
    </View>
  )
}

CompanyCategory.defaultProps = {
  list: []
}

export default CompanyCategory
