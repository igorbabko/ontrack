import { ref, computed } from 'vue'
import { NULLABLE_ACTIVITY } from './constants'
import { id, generateActivities, generateActivitySelectOptions } from './functions'

export const activities = ref(generateActivities())

export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

export function createActivity(name) {
  activities.value.push({
    id: id(),
    name,
    secondsToComplete: 0
  })
}

export function deleteActivity(activity) {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null
      timelineItem.activitySeconds = 0
    }
  })

  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete || 0
}

export function findActivityById(id) {
  return activities.value.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
}
