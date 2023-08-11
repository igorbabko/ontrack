import { ref } from 'vue'
import { MILLISECONDS_IN_SECOND } from '../constants'

export function useStopwatch(initialSeconds = 0) {
  console.log(initialSeconds)

  const seconds = ref(initialSeconds)
  const isRunning = ref(false)

  function start() {
    isRunning.value = setInterval(() => (seconds.value += 120), MILLISECONDS_IN_SECOND)
  }

  function stop() {
    clearInterval(isRunning.value)

    isRunning.value = false
  }

  function reset() {
    stop()

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
