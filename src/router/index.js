import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/register'
import Login from '../views/Login'
import UserInfo from '../views/userinfo'
import Edit from '../views/edit'
import Home from '../views/home'
import article from '../views/Article'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    component: Register
  },
  {
    path: '/',
    component: Home,
    meta: {
      keepalive: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/userinfo',
    component: UserInfo,
    meta: {
      istoken: true
    }
  },
  {
    path: '/edit',
    component: Edit,
    meta: {
      istoken: true
    }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      istoken: true,
      keepalive: true
    }
  },
  {
    path: '/article/:id',
    component: article,
    meta: {
      istoken: true
    }
  }
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
]

const router = new VueRouter({
  routes
})

// 导航守卫 如果没有token或者id亦或者路由中meta为true则跳转登录页面
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('token') && !localStorage.getItem('id') && to.meta.istoken) {
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  next()
})

export default router
