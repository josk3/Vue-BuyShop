import { defineStore } from "pinia";
import { ref } from "vue";
import { getLoginAPI } from '@/apis/user'
import {useCartStore} from './cartStore'

// 用户个人信息
export const useUserStore = defineStore('user', () => {
    const userInfo = ref({})
    const cartStore = useCartStore()
    
     //组件传参给action调用的接口 而不是组件直接传参给state
    const getUserInfo = async ({ account, password }) => {
        const res = await getLoginAPI({ account, password })
        console.log(res);
        userInfo.value = res.data.result
    }

    // 退出时清除用户信息
    const clearUserInfo = () =>{
        userInfo.value = {}
        // 清楚购物车的action
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
