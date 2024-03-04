// 默认重置样式
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useIntersectionObserver } from '@vueuse/core'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 自定义指令
app.directive('img-lazy', {
    mounted(el, binding) {
        // el:指令绑定的那个元素 img
        // binding: binding.value指令等于号后面绑定的表达式的值图片url
        
        // 测试自定义语法是否成功
        console.log(el, binding.value)
        
        useIntersectionObserver(
            el,
            ([{ isIntersecting }]) => {
                // 测试图片监控是否生效
                console.log(isIntersecting)

                // 如果图片进入视口，发送 图片资源请求
                if(isIntersecting)
                {
                    el.src = binding.value
                }
            },
        )

    }
})