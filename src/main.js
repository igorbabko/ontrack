import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

createApp(App).mount('#app')
