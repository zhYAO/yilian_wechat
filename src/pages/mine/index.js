import Taro,{useEffect} from '@tarojs/taro';
import { View,Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.less';

const Mine = props =>{
    const {mine,loading} = props;
      useEffect(() => {
        console.log(props)
      }, [])
    return (
           <View className="mine-page">
             <Text>正如你所见这是你的mine页面</Text>
           </View>
           )
}
Mine.config = {
  navigationBarTitleText: 'mine'
}
//全局样式继承 你可以关掉
Mine.options = {
  addGlobalClass: true
}
export default connect(
    ({
    mine,
    loading
    })=>({
    mine,
    loading
}))(Mine)
