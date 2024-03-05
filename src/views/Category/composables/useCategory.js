// 封装分类业务逻辑
import { getTopCategoryAPI } from '@/apis/category';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { onBeforeRouteUpdate } from 'vue-router';

export const useCategory = () => {
    // 数据
    const route = useRoute()
    const getTopCategoryData = ref({})

    const getTopCategory = async (id = route.params.id) => {
        // 获取路由参数进行传参
        const res = await getTopCategoryAPI(id)
        console.log(id);

        getTopCategoryData.value = res.data.result
    }
    onMounted(() => getTopCategory())

    // 路由导航守卫: 路由参数变化的时候 重新发送获取列表数据的接口
    onBeforeRouteUpdate((to) => {
        console.log('路由变化了');
        console.log(to.params.id);
        getTopCategory(to.params.id)
    })

    return {
        getTopCategoryData
    }
}