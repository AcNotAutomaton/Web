import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局css
import './assets/global.css';

// Element-Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ELIcons from '@element-plus/icons-vue'

// 全局注册el-icon
const app = createApp(App)
for (let iconName in ELIcons) {
    app.component(iconName, ELIcons[iconName])
}

app
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
