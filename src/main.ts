import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuex from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'normalize.css'
import './assets/css/index.less'
import hyRequest from './service'

const app = createApp(App)

app.use(router).use(vuex).use(ElementPlus).mount('#app')

console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.VUE_APP_BASE_NAME)

interface DataType {
    data: any
    returnCode: string
    success: boolean
}

hyRequest
    .get<DataType>({
        url: '/home/multidata',
        showLoading: false
    })
    .then((res) => {
        console.log(res.data)
        console.log(res.returnCode)
        console.log(res.success)
    })
hyRequest.request({
    url: '/home/multidata',
    method: 'GET'
})
