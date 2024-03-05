import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'

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
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

export default router
