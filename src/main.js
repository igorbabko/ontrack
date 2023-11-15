import { createApp } from 'vue'
import { loadState, saveState } from './storage'
import { startTimelineItemTimer, findActiveTimelineItem } from './timeline-items'
import App from './App.vue'

import './assets/main.css'

loadState()

const activeTimelineItem = findActiveTimelineItem()

if (activeTimelineItem) {
  startTimelineItemTimer(activeTimelineItem)
}

document.addEventListener('visibilitychange', () =>
  document.visibilityState === 'visible' ? loadState() : saveState()
)

createApp(App).mount('#app')
