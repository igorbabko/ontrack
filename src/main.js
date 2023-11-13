import { createApp } from 'vue'
import { loadState, saveState } from './storage'
import App from './App.vue'

import './assets/main.css'

loadState()

document.addEventListener('visibilitychange', () =>
  document.visibilityState === 'visible' ? loadState() : saveState()
)

createApp(App).mount('#app')
