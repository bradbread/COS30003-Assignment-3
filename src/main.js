import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
require('bootstrap/dist/css/bootstrap.css')
require('bootstrap-vue/dist/bootstrap-vue.css')

createApp(App).use(router).mount('#app')
