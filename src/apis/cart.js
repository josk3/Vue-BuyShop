import request from '@/utils/http'


// 加入购物车
export const insertCartAPI = ({ skuId, count }) => {
    return request({
        url: '/member/cart',
        method: 'POST',
        data: {
            skuId,
            count
        }
    })
}


export const getCartListAPI = () => {
    return request({
        url : '/member/cart'
    })
}