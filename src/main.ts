import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuex from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)

app.use(router).use(vuex).use(ElementPlus).mount('#app')

console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.VUE_APP_BASE_NAME)
