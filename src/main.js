
//引入样式
import '@/style/reset.scss'
//引入 创建 vue
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//引入pinia
import { createPinia } from 'pinia'
//引入element中文
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'



const app = createApp(App)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
  })
app.mount('#app')

