// 把components中的所组件都进行全局化注册
// 通过插件的方式

import ImageView from '@/components/ImageView/index.vue'
import XtxGoodSku from '@/components/XtxSku/index.vue'
import GoodsItem from '@/components/GoodsItems/index.vue'

export const componentPlugin = {
    install(app) {
        app.component('XtxImageView', ImageView)
        app.component('XtxSku', XtxGoodSku)
        app.component('XtxGoodsItems', GoodsItem)
    }
}  