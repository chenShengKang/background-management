
import axios from 'axios'
const MyHttpServer = {}

MyHttpServer.install =  (Vue) => {
 
  axios.defaults.baseURL = `/api`

  axios.interceptors.request.use(function(config){
    if(config.url !== 'login'){
      const AUTH_TOKEN = localStorage.getItem('token')
      config.headers.common['Authorization'] = AUTH_TOKEN
    }
    return config
  })

  // 4. 添加实例方法
  Vue.prototype.$http = axios
}
export default MyHttpServer