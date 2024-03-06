// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
    install(app) {
        // 自定义指令
        app.directive('img-lazy', {
            mounted(el, binding) {
                // el:指令绑定的那个元素 img
                // binding: binding.value指令: 等于号后面绑定的表达式的值图片url

                // 测试自定义语法是否成功
                // console.log(el, binding.value)

                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        // 测试图片监控是否生效
                        console.log(isIntersecting)

                        // 如果图片进入视口，发送 图片资源请求
                        if (isIntersecting) {
                            el.src = binding.value
                            stop()
                        }
                    },
                )

            }
        })
    }
}