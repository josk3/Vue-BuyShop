
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { carouselEmits } from 'element-plus'


// 本地购物车
export const useCartStore = defineStore('cart', () => {
    const cartList = ref([])

    // 组件传参给action更新state 而不是调用接口
    const getCartList = (goods) => {
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
            item.count += goods.count
        }
        else {
            cartList.value.push(goods)
        }
    }

    // 删除购物车
    const delCart = (skuId) => {
        // 1. splice写法

        // const index = cartList.value.findIndex((item) => item.skuId === skuId)
        // cartList.value.splice(index, 1)

        // 2. filter过滤写法

        cartList.value = cartList.value.filter((item) => item.skuId != skuId)
    }

    // 计算属性
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

    return {
        cartList,
        getCartList,
        delCart,
        allCount,
        allPrice
    }
}, {
    persist: true
})
