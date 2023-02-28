import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import router from './router.js'
import store from './store/store.js'
import appAxios from './appAxios'

import io from 'socket.io-client'
const socket = io('http://localhost:9999')

const app = createApp(App);

app.use(store);
app.use(router);

app.config.globalProperties.$appAxios = appAxios
app.config.globalProperties.$socket = socket

app.mount('#app');
