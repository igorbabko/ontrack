import { ref, computed } from 'vue'
import { SECONDS_IN_HOUR } from './constants'
import { id } from './functions'

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
  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete || 0
}

function generateActivities() {
  return ['Coding', 'Reading', 'Training'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: hours * SECONDS_IN_HOUR
  }))
}

function generateActivitySelectOptions() {
  return activities.value.map((activity) => ({ value: activity.id, label: activity.name }))
}
