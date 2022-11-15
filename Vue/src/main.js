import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/index.scss'


// 统一导入element图标
import * as Icons from '@element-plus/icons-vue'
import axios from 'axios'

//设置axios默认Url地址前缀
axios.defaults.baseURL = "http://localhost:3000/"

const app = createApp(App)
app.use(ElementPlus)
    .use(store)
    .use(router)
    .mount('#app')

//注册全局element-icons组件
Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key])
})
