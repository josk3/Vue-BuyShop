import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'

export const useCategoryStore = defineStore('category', () => {
    // state封装数据
    const categoryList = ref([])

    // action异步请求
    const getCategory = async () => {
        const res = await getCategoryAPI()
        categoryList.value = res.data.result
    }

    return {
        categoryList,
        getCategory
    }
})
