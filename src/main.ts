import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuex from './store'
import { setupStore } from './store'
import { globalRegister } from './global'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)

setupStore()

app.use(router).use(vuex).use(ElementPlus).use(globalRegister).mount('#app')
