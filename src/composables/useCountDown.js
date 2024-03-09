import { computed, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
    const time = ref(0)
    const t = null
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    let start = (curTime) => {
        time.value = curTime
        t = setInterval(() => {
            time.value--
        }, 1000);
    }

    // 清楚定时器
    onUnmounted(() => {
        if(t) clearInterval(t)
    })
    return {
        formatTime,
        start
    }
}