// 封装banner业务逻辑
import { ref , onMounted } from "vue"
import { getBannerAPI } from "@/apis/home"

export const useBanner = () => {
    const BannerList = ref([])
    const getBanner = async () => {
        // 传参
        const res = await getBannerAPI({
            distributionSite: '2'
        })
        BannerList.value = res.data.result
    }
    onMounted(() => getBanner())

    return {
        BannerList
    }
}