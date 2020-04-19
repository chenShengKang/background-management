import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/views/login/Login')
const Home = () => import('@/views/home/Home')
const User = () => import('@/views/home/child/user/User')
const Perm = () => import('@/views/home/child/perm/Perm')
const Right = () => import('@/views/home/child/perm/Right')
const Goods = () => import('@/views/home/child/goods/Goods')
const GoodsAdd = () => import('@/views/home/child/goods/GoodsAdd')
const CategoryParams = () => import('@/views/home/child/goods/CategoryParams')
const Category = () => import('@/views/home/child/goods/Category')
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
        },
        {
          path:'/home/goods',
          name:'goods',
          component:Goods,
          
        },
        {
          path:'/home/good/add',
          name:'goodadd',
          component:GoodsAdd
        },
        {
          path:'/home/params',
          name:'params',
          component:CategoryParams
        },
        {
          path:'/home/category',
          name:'category',
          component:Category
        }
      ]
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from ,next) => {
  if(to.path === '/login'){
    next()
    return 
  } 
  const token = localStorage.getItem('token')
  if(!token){
    router.push({
      name:'login'
    })
  }
  
  next()
})

export default router
