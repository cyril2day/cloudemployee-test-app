import { createApp } from 'vue'
import 'modules/normalize.css' // load reset prior to app styles
import 'nprogress/nprogress.css'
import App from './App.vue'
import pinia from './stores'
import router from './router'

createApp(App)
.use(pinia)
.use(router)
.mount('#app')
