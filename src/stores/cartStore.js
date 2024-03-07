
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { insertCartAPI , getCartListAPI} from '@/apis/cart'

// 本地购物车
export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    const cartList = ref([])

    // 组件传参给action更新state 而不是调用接口
    const getCartList = async (goods) => {
        const {skuId, count} = goods
        const item = cartList.value.find((item) => goods.skuId === item.skuId) 
        if (token) {
            // 登录
            await insertCartAPI({skuId, count})
            const res = await getCartListAPI()
            cartList.value = res.data.result
        } else {
            // 未登录
            if (item) {
                item.count += goods.count
            }
            else {
                cartList.value.push(goods)
            }
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

    // 计算属性 reduce方法 1.总数量 + 2.总价钱
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

    // 单选回调
    const singleChange = (skuId, selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }

    // 是否全选
    const isAll = computed(() => cartList.value.every(item => item.selected))

    // 全选功能
    const isAllChange = (selected) => {
        cartList.value.forEach(item => item.selected = selected)
    }

    // 计算属性 reduce方法 1.已选择总数量 + 2.已选择总价钱
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

    return {
        cartList,
        allCount,
        allPrice,
        isAll,
        selectedCount,
        selectedPrice,
        getCartList,
        delCart,
        singleChange,
        isAllChange
    }
}, {
    persist: true
})
