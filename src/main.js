import { createApp } from 'vue'
import App from './App.vue'
import './assets/style/global.css'
import router from './router.js'
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
