import { ref, watch } from 'vue'
import { MILLISECONDS_IN_SECOND } from '../constants'
import { updateTimelineItem } from '../timeline-items'

export function useStopwatch(timelineItem) {
  const seconds = ref(timelineItem.activitySeconds)
  const isRunning = ref(false)

  watch(
    () => timelineItem.activityId,
    () => {
      updateTimelineItem(timelineItem, { activitySeconds: seconds.value * 120 })
    }
  )

  function start() {
    isRunning.value = setInterval(() => {
      updateTimelineItem(timelineItem, {
        activitySeconds: timelineItem.activitySeconds + 120
      })

      seconds.value++
    }, MILLISECONDS_IN_SECOND)
  }

  function stop() {
    clearInterval(isRunning.value)

    isRunning.value = false
  }

  function reset() {
    stop()

    updateTimelineItem(timelineItem, {
      activitySeconds: timelineItem.activitySeconds - seconds.value * 120
    })

    seconds.value = 0
  }

  return {
    seconds,
    start,
    stop,
    reset
  }
}
