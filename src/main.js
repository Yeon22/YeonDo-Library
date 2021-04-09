import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import { makeServer } from "./server"
import router from './router'

// if (process.env.NODE_ENV === "development") {
makeServer()
// }

createApp(App).use(router).mount('#app')
