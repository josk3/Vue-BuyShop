<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'
import { useCategoryStore } from '@/stores/category';
import { onMounted } from 'vue';


const categoryStore = useCategoryStore()
onMounted(() => categoryStore.getCategory())
</script>

<template>
  <LayoutFixed></LayoutFixed>
  <LayoutNav />
  <LayoutHeader />

  
  <!-- 二级路由出口 -->
  <!-- 绑定一个key属性 强制破坏组件复用  -->
  <!-- <RouterView :key="$route.fullPath"/> -->
  <RouterView/>
  


  <LayoutFooter />
</template>