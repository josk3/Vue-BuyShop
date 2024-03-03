// import instance from "@/utils/http";

// // 根据接口文档封装接口函数
// export function getCategoryAPI() {
//     return instance({
//         url: '/home/category/head'
//     })
// }


import instance from "@/utils/http";

export function getCategoryAPI() {
    return instance({
        url: '/home/category/head'
    })
}