import { defineStore } from "pinia";
import { ref } from "vue";
import { getLoginAPI } from '@/apis/user'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'

// 用户个人信息
export const useUserStore = defineStore('user', () => {

    const cartStore = useCartStore()
    const userInfo = ref({})


    //组件传参给action调用的接口 而不是组件直接传参给state
    const getUserInfo = async ({ account, password }) => {
        const res = await getLoginAPI({ account, password })
        // console.log(res);
        userInfo.value = res.data.result
        // 合并购物车
        await mergeCartAPI(cartStore.cartList.map(item => {
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }
        }))
        cartStore.getNewCartList()
    }

    // 退出时清除用户信息
    const clearUserInfo = () => {
        userInfo.value = {}
        // 退出时清楚购物车的action
        cartStore.clearCart()
    }

    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},
    {
        persist: true
    }
)
