import instance from "@/utils/http";

// banner接口函数
export const getBannerAPI = () => {
    return instance({
        url: '/home/banner'
    })
}