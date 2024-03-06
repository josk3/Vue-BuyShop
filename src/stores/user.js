import { defineStore } from "pinia";
import { ref } from "vue";
import { getLoginAPI } from '@/apis/user'

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({})
    const getUserInfo = async ({ account, password }) => {
        const res = await getLoginAPI({ account, password })
        console.log(res);
        userInfo.value = res.data.result
    }

    // 退出时清除用户信息
    const clearUserInfo = () =>{
        userInfo.value = {}
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
