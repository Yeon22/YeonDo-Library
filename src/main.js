import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import { makeServer } from "./server"

// if (process.env.NODE_ENV === "development") {
  makeServer()
// }

createApp(App).mount('#app')
