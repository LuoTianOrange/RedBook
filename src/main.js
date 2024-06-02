import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {install} from '@icon-park/vue-next/es/all';
import '@icon-park/vue-next/styles/index.css';
import router from './router/index'
import pinia from './stores'
import axios from 'axios'

const app = createApp(App)
app.use(ElementPlus).use(router).use(pinia).use(axios)

install(app, 'i')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')