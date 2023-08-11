import { ref } from 'vue'
import { MILLISECONDS_IN_SECOND } from '../constants'

export function useStopwatch(initialSeconds = 0, handleSecondsChange = null) {
  const seconds = ref(initialSeconds)
  const isRunning = ref(false)

  function start() {
    isRunning.value = setInterval(() => {
      handleSecondsChange(120)

      seconds.value++
    }, MILLISECONDS_IN_SECOND)
  }

  function stop() {
    clearInterval(isRunning.value)

    isRunning.value = false
  }

  function reset() {
    stop()

    handleSecondsChange(-seconds.value * 120)

    seconds.value = 0
  }

  return {
    seconds,
    start,
    stop,
    reset
  }
}
