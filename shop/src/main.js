import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import axios from 'axios'

// 设置axios默认Url地址前缀
axios.defaults.baseURL = 'http://localhost:3000/'

const app = createApp(App)

app.use(ElementPlus).use(router).mount('#app')
// 定义全局变量$imageUrl,图片服务器地址前缀
app.config.globalProperties.$imageUrl = 'http://localhost:3000/'
