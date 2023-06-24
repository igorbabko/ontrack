import { ref } from 'vue'
import { generateTimelineItems } from './functions'
import { findActivityById, activities } from './activities'

export const timelineItems = ref(generateTimelineItems(activities.value))

export function setTimelineItemActivity(timelineItem, activityId) {
  timelineItem.activityId = findActivityById(activityId).id
}

export function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}
