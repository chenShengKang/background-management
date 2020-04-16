import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/login/Login')
const Home = () => import('@/views/home/Home')
const User = () => import('@/views/home/child/User')

Vue.use(VueRouter)

  const routes = [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/home',
      name:'home',
      component:Home,
      children:[
        {
          path:'/home/user',
          name:'user',
          component:User
        }
      ]
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
