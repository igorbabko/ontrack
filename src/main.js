import { createApp, watch } from 'vue'
import { startTimer, updateTime } from './time'
import { currentPage } from './router'
import App from './App.vue'

import './assets/main.css'

startTimer()

watch(currentPage, updateTime)

createApp(App).mount('#app')
