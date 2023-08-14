import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { Quasar,Loading, Notify } from 'quasar'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import './assets/main.css'
import axios from 'axios'

const app = createApp(App)

app.use(router)
app.use(Quasar, {
    plugins: { 
      Loading,
      Notify
    },
  })
  axios.defaults.baseURL = 'http://moprabthai.thddns.net:9090/api/public/api';
  // axios.defaults.baseURL = 'http://127.0.0.1/api/public/api';
app.mount('#app')
