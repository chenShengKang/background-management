import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// vue element-ui 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

// 导入封装的 axios
import MyHttpServer from '@/plugins/http.js'
Vue.config.productionTip = false

//安装日期格式包
import { formaDate } from '@/lib/formDate.js'
// Vue 加载
Vue.use(ElementUI);
Vue.use(MyHttpServer)

Vue.filter('fmtdate',(v) => {
  return formaDate(v,'yyyy-MM-dd')
})

//导入全局组件
import Crumbs from '@/components/crumbs/Crumbs'
Vue.component(Crumbs.name,Crumbs)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
