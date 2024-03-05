<script setup>
import { getCategoryFilterAPI } from '@/apis/category'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getSubCategoryAPI } from '@/apis/category'
import GoodsItems from '../Home/components/GoodsItems.vue';

// 获取面包屑导航数据
const route = useRoute()
const CategoryData = ref({})

const getCategoryData = async () => {
    const res = await getCategoryFilterAPI(route.params.id)
    console.log(res)
    CategoryData.value = res.data.result
}
onMounted(() => getCategoryData())

// 获取基础列表基础数据
const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime' 
})
const SubCategoryData = ref([])
const getSubCategoryData = async () => {
    const res = await getSubCategoryAPI(reqData.value)
    console.log(res)
    SubCategoryData.value = res.data.result.items
}
onMounted(() => getSubCategoryData())

// tab切换回调
const tabChange = () => {
    reqData.page = 1
    getSubCategoryData()
}

// 无限加载
const disabled = ref(false)
const load = async () => {
    console.log('加载更多');
    
    // 获取下一页的数据
    reqData.value.page ++
    const res = await getSubCategoryAPI(reqData.value)
    SubCategoryData.value = [...SubCategoryData.value, ...res.data.result.items]

    // 加载完毕 停止监听 可以联系后端
    if(res.data.result.items == 0)
    {
        disabled.value = true
    }
}
</script>

<template>
    <div class="container ">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <!-- 路由跳转: 动态传递路由参数id -->
                <el-breadcrumb-item :to="`/category/${CategoryData.parentId}`">{{ CategoryData.parentName }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{ CategoryData.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sub-container">
            <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
                <!-- 商品列表-->
                <GoodsItems v-for="item in SubCategoryData" :good="item" :key="item.id"></GoodsItems>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }


}
</style>