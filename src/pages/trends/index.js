import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux'
import SearchPart from '@components/page-components/search-part'
import FocusCard from '@components/page-components/focus-card'
import CustomNavigator from '@components/page-components/custom-navigator'
import CommentCard from '@components/page-components/comment-card'
import './index.less'

const Trends = props => {
  const {
    common: { navBarPaddingTop },
    trends: { focusCardsList, comentCardList }
  } = props

  return (
    <View className="container" style={{ paddingTop: navBarPaddingTop + 'px' }}>
      {/* 头部搜索栏 */}
      <SearchPart>
        <AtIcon value="add-circle" size="20" color="#333"></AtIcon>
      </SearchPart>

      {/* 推荐关注 */}
      <CustomNavigator title="推荐关注" />
      <View>
        {focusCardsList.map(item => {
          return <FocusCard card={item} />
        })}
      </View>
      <View className="container__gap"></View>

      {/* 评论卡片 */}
      <View className="container__comment">
        {comentCardList.map(item => {
          return (
            <View className="container__comment__item">
              <CommentCard card={item} />
            </View>
          )
        })}
      </View>
    </View>
  )
}
export default connect(({ common, trends }) => ({
  common,
  trends
}))(Trends)
