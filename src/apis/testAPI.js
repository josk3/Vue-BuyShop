import instance from "@/utils/http";

// 按需导出函数
export function getCategoryAPI() {
    return instance({
        url: 'home/category/head'
    })
}