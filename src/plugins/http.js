
import axios from 'axios'
const MyHttpServer = {}

MyHttpServer.install =  (Vue) => {
 
  axios.defaults.baseURL = `/api`
  // 4. 添加实例方法
  Vue.prototype.$http = axios
}
export default MyHttpServer