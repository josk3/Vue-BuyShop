import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import CheckOut from '@/views/CheckOut/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'

// createRouter:创建router实例对象
// createWebHistory:创建history模式的路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          // 动态路由传参
          path: 'category/:id',
          component: Category
        },
        {
          // 动态路由传参
          path: 'category/sub/:id',
          component: SubCategory
        },
        {
          path: 'detail/:id',
          component: Detail
        },
        { 
          path: 'cartlist',
          component: CartList
        },
        { 
          path: 'checkout',
          component: CheckOut
        },
        {
          path: 'pay',
          component: Pay
        },
        {
          path: 'paycallback',
          component: PayBack
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ],

  // 路由滚动优化
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
