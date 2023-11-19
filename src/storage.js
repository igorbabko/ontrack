import { APP_NAME } from './constants'
import { endOfHour, isToday, toSeconds, today } from './time'
import { activities } from './activities'
import { activeTimelineItem, resetTimelineItems, timelineItems } from './timeline-items'
import { toggleTimelineItemTimer } from './timeline-item-timer'

export function syncState(shouldLoad = true) {
  shouldLoad ? loadState() : saveState()

  if (activeTimelineItem.value) {
    toggleTimelineItemTimer(shouldLoad)
  }
}

export function loadState() {
  const serializedState = localStorage.getItem(APP_NAME)

  const state = serializedState ? JSON.parse(serializedState) : {}

  activities.value = state.activities || activities.value

  const lastActiveAt = new Date(state.lastActiveAt)

  if (isToday(lastActiveAt)) {
    timelineItems.value = syncIdleSeconds(state.timelineItems, lastActiveAt)
  } else if (state.timelineItems) {
    timelineItems.value = resetTimelineItems(state.timelineItems)
  }
}

export function saveState() {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      timelineItems: timelineItems.value,
      activities: activities.value,
      lastActiveAt: today()
    })
  )
}

function syncIdleSeconds(timelineItems, lastActiveAt) {
  const activeTimelineItem = timelineItems.find(({ isActive }) => isActive)

  if (activeTimelineItem) {
    activeTimelineItem.activitySeconds += calculateIdleSeconds(lastActiveAt)
  }

  return timelineItems
}

function calculateIdleSeconds(lastActiveAt) {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds(today() - lastActiveAt)
    : toSeconds(endOfHour(lastActiveAt) - lastActiveAt)
}
