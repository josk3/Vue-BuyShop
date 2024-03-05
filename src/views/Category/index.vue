<script setup>
import { getTopCategoryAPI } from '@/apis/category';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getBannerAPI } from '@/apis/home';
import GoodsItem from '../Home/components/GoodsItems.vue';
import { onBeforeRouteUpdate } from 'vue-router';

// 数据
const route = useRoute()
const getTopCategoryData = ref({})
// const getTopCategory = async () => {
  // 获取路由参数进行传参
//   console.log(route.params.id);
//   const res = await getTopCategoryAPI(route.params.id)

//   getTopCategoryData.value = res.data.result
// }
// onMounted(() => getTopCategory())
// }

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

// banner
const BannerList = ref([])
const getBanner = async () => {
  // 传参
  const res = await getBannerAPI({
    distributionSite: '2'
  })
  BannerList.value = res.data.result
}
onMounted(() => getBanner())
</script>

<template>
  <div>
    我是Category界面
  </div>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ getTopCategoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- banner -->
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in BannerList" :key="item.id">
            <img :src="item.imgUrl" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 分类列表渲染 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in getTopCategoryData.children" :key="i.id">
            <RouterLink to="/">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="ref-goods" v-for="item in getTopCategoryData.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}

.home-banner {
  width: 1240px;
  height: 500px;
  margin: 0 atuo;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>