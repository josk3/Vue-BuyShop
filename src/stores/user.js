import { defineStore } from "pinia";
import { ref } from "vue";
import { getLoginAPI } from '@/apis/user'

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({})
    const getUserInfo = async ({ account, password }) => {
        const res = await getLoginAPI({ account, password })
        userInfo.value = res.data.result
    }

    return {
        userInfo,
        getUserInfo
    },
    {
        persist: true
    }

})