import Taro,{useEffect} from '@tarojs/taro';
import { View,Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.less';

const Company = props =>{
    const {company,loading} = props;
      useEffect(() => {
        console.log(props)
      }, [])
    return (
           <View className="company-page">
             <Text>正如你所见这是你的company页面</Text>
           </View>
           )
}
Company.config = {
  navigationBarTitleText: 'company'
}
//全局样式继承 你可以关掉
Company.options = {
  addGlobalClass: true
}
export default connect(
    ({
    company,
    loading
    })=>({
    company,
    loading
}))(Company)
