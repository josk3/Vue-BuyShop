
import { ref } from 'vue'
import { defineStore } from 'pinia'


// 本地购物车
export const useCartStore = defineStore('cart', () => {
    const cartList = ref([])

    // 组件传参给action更新state 而不是调用接口
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
