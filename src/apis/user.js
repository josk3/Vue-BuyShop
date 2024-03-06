import request from '@/utils/http'

export const getLoginAPI = ({account , password}) => {
    return request({
        url: '/login',
        method: 'POST',
        data: {
            account,
            password
        }
    })
}
