import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// 全局css
import './assets/global.css';

// Element-Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css'

createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
