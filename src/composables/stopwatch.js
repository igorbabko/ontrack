import { ref } from 'vue'
import { MILLISECONDS_IN_SECOND } from '../constants'

export function useStopwatch(initialSeconds = 0, handleSecondsChange = null) {
  const seconds = ref(initialSeconds)
  const isRunning = ref(false)
  const temp = 120

  function start() {
    isRunning.value = setInterval(() => {
      seconds.value += temp

      handleSecondsChange(seconds.value)
    }, MILLISECONDS_IN_SECOND)
  }

  function stop() {
    clearInterval(isRunning.value)

    isRunning.value = false
  }

  function reset() {
    stop()

    handleSecondsChange(-seconds.value)

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
