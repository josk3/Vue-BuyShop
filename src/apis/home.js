import instance from "@/utils/http";

// banner接口函数
export const getBannerAPI = () => {
  return instance({
    url: '/home/banner'
  })
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
  return instance({
    url: '/home/new'
  })
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => {
  return instance({
    url: '/home/hot'
  })
}