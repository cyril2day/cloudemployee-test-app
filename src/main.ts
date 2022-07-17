import { createApp } from 'vue'
import 'modules/normalize.css' // load reset prior to app styles
import App from './App.vue'
import router from './router'

createApp(App)
.use(router)
.mount('#app')
