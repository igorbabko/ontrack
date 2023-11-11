import { createApp } from 'vue'
import * as storage from './storage'
import { activities } from './activities'
import { timelineItems } from './timeline-items'
import App from './App.vue'

import './assets/main.css'

loadState()

document.addEventListener('visibilitychange', () => {
  document.visibilityState === 'visible' ? loadState() : saveState()
})

function loadState() {
  const state = storage.load()

  timelineItems.value = state.timelineItems
  activities.value = state.activities
}

function saveState() {
  storage.save({
    timelineItems: timelineItems.value,
    activities: activities.value
  })
}

createApp(App).mount('#app')
