import { createApp } from 'vue'
import { timelineItems } from './timeline-items'
import { activities } from './activities'
import * as storage from './storage'
import { isToday } from './time'
import App from './App.vue'

import './assets/main.css'

loadState()

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    console.log('visible')

    loadState()
  } else {
    console.log('hidden')

    saveState()
  }
})

createApp(App).mount('#app')

function loadState() {
  const state = storage.load()

  activities.value = state.activities || activities.value

  timelineItems.value = isToday(new Date(state.date)) ? state.timelineItems : timelineItems.value
}

function saveState() {
  storage.save({ timelineItems: timelineItems.value, activities: activities.value })
}
