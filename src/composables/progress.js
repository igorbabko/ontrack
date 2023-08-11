import { computed } from 'vue'
import { HUNDRED_PERCENT } from '../constants'
import { normalizePercentage, getProgressColorClass } from '../functions'
import { timelineItems, getTotalActivitySeconds } from '../timeline-items'

export function useProgress(activity) {
  const colorClass = computed(() => getProgressColorClass(percentage.value))

  const percentage = computed(() =>
    normalizePercentage((seconds.value * HUNDRED_PERCENT) / activity.secondsToComplete)
  )

  const seconds = computed(() => getTotalActivitySeconds(activity, timelineItems.value))

  return {
    colorClass,
    percentage,
    seconds
  }
}
