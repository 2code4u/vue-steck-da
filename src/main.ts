import './assets/base.css'
import "@mdi/font/css/materialdesignicons.css";

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify.ts'
import store from './stores/index.ts'

import VueTheMask from 'vue-the-mask'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(vuetify)
app.use(VueTheMask)

app.mount('#app')
