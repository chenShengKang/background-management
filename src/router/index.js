import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/login/Login')
const Home = () => import('@/views/home/Home')
const User = () => import('@/views/home/child/user/User')
const Perm = () => import('@/views/home/child/perm/Perm')
const Right = () => import('@/views/home/child/perm/Right')
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
        },
        {
          path:'/home/perm',
          name:'perm',
          component:Perm
        },
        {
          path:'/home/right',
          name:'right',
          component:Right
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
