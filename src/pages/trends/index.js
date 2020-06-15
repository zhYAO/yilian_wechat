import Taro,{useEffect} from '@tarojs/taro';
import { View,Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.less';

const Trends = props =>{
    const {trends,loading} = props;
      useEffect(() => {
        console.log(props)
      }, [])
    return (
           <View className="trends-page">
             <Text>正如你所见这是你的trends页面</Text>
           </View>
           )
}
Trends.config = {
  navigationBarTitleText: 'trends'
}
//全局样式继承 你可以关掉
Trends.options = {
  addGlobalClass: true
}
export default connect(
    ({
    trends,
    loading
    })=>({
    trends,
    loading
}))(Trends)
