import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
    // state封装数据
    const cartList = ref([])

    // action异步请求
    const getCartList = (goods) => {
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if(item)
        {
            item.count += goods.count
        }
        else
        {
            cartList.value.push(goods)
        }
    }

    return {
        cartList,
        getCartList
    }
},{
    persist:true
})
