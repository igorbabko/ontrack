import { ref, watch } from 'vue'
import { MILLISECONDS_IN_SECOND } from '../constants'
import { updateTimelineItem } from '../timeline-items'

export function useStopwatch(timelineItem) {
  const seconds = ref(timelineItem.activitySeconds)
  const isRunning = ref(false)
  const temp = 120

  watch(
    () => timelineItem.activityId,
    () => updateTimelineItem(timelineItem, { activitySeconds: seconds.value })
  )

  function start() {
    isRunning.value = setInterval(() => {
      updateTimelineItem(timelineItem, {
        activitySeconds: timelineItem.activitySeconds + temp
      })

      seconds.value += temp
    }, MILLISECONDS_IN_SECOND)
  }

  function stop() {
    clearInterval(isRunning.value)

    isRunning.value = false
  }

  function reset() {
    stop()

    updateTimelineItem(timelineItem, {
      activitySeconds: timelineItem.activitySeconds - seconds.value
    })

    seconds.value = 0
  }

  return {
    seconds,
    isRunning,
    start,
    stop,
    reset
  }
}
