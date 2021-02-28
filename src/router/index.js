import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/baseLayout'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/Homepage.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: '/product',
        name: 'Product',
        component: () => import(/* webpackChunkName: "about" */ '../views/Products.vue')
      },
      {
        path: '/contact',
        name: 'Contact',
        component: () => import(/* webpackChunkName: "about" */ '../views/Contact.vue')
      },
      {
        path: '/productDetail',
        name: 'productDetail',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../components/ProductDetail.vue')
      }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
