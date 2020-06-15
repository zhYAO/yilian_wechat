import Taro,{useEffect} from '@tarojs/taro';
import { View,Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.less';

const Discover = props =>{
    const {discover,loading} = props;
      useEffect(() => {
        console.log(props)
      }, [])
    return (
           <View className="discover-page">
             <Text>正如你所见这是你的discover页面</Text>
           </View>
           )
}
Discover.config = {
  navigationBarTitleText: 'discover'
}
//全局样式继承 你可以关掉
Discover.options = {
  addGlobalClass: true
}
export default connect(
    ({
    discover,
    loading
    })=>({
    discover,
    loading
}))(Discover)
