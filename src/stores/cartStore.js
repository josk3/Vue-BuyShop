
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'


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

    // 删除购物车商品
    const delCart = (skuId) => {
        // 1. findIndex + splice写法

        // const index = cartList.value.findIndex((item) => item.skuId === skuId)
        // cartList.value.splice(index, 1)

        // 2. filter过滤写法
        cartList.value = cartList.value.filter((item) => item.skuId != skuId)
    }

    // 计算属性 reduce方法
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

    // 单选回调
    const singleChange = (skuId , selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }

    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))

    // 全选功能
    const isAllChange = (selected) => {
        cartList.value.forEach(item => item.selected = selected)
    }

    return {
        cartList,
        allCount,
        allPrice,
        isAll,
        getCartList,
        delCart,
        singleChange,
        isAllChange
    }
}, {
    persist: true
})
