import { createApp } from 'vue'
import * as storage from './storage'
import { activities } from './activities'
import { timelineItems } from './timeline-items'
import { isToday } from './time'
import App from './App.vue'

import './assets/main.css'

loadState()

document.addEventListener('visibilitychange', () => {
  document.visibilityState === 'visible' ? loadState() : saveState()
})

function loadState() {
  const state = storage.load()

  timelineItems.value = isToday(new Date(state.date)) ? state.timelineItems : timelineItems.value
  activities.value = state.activities || activities.value
}

function saveState() {
  storage.save({
    timelineItems: timelineItems.value,
    activities: activities.value
  })
}

createApp(App).mount('#app')
