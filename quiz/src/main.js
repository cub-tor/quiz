import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import router from './router'

//Bootstrap
import '@/assets/css/bootstrap.min.css';
import '@/assets/js/bootstrap.bundle.min.js';


createApp(App).use(router).mount('#app')

//createApp(App).mount('#app')
