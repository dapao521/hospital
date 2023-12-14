
//引入样式
import "/src/style/reset.scss"
//引入 创建 vue
import { createApp } from "/node_modules/.vite/deps/vue.js?v=ec0f3718"
import App from "/src/App.vue"
import router from "/src/router/index.js?t=1701860256858"
//引入pinia
import { createPinia } from "/node_modules/.vite/deps/pinia.js?v=ec0f3718"
//引入element中文
import ElementPlus from "/node_modules/.vite/deps/element-plus.js?v=ec0f3718"
import zhCn from "/node_modules/.vite/deps/element-plus_dist_locale_zh-cn__mjs.js?v=ec0f3718"
import piniaPluginPersistedstate from "/node_modules/.vite/deps/pinia-plugin-persistedstate.js?v=ec0f3718"



const app = createApp(App)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
  })
app.mount('#app')

