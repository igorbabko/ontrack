import { ref, computed, watchEffect, onActivated, onDeactivated } from 'vue'
import {
  SECONDS_IN_MINUTE,
  SECONDS_IN_DAY,
  MINUTES_IN_HOUR,
  HUNDRED_PERCENT,
  MILLISECONDS_IN_SECOND
} from '../constants'
import { currentDate } from '../functions'

function calculateSecondsSinceMidnight() {
  const now = currentDate()

  now.setHours(23)

  return (
    SECONDS_IN_MINUTE * MINUTES_IN_HOUR * now.getHours() +
    SECONDS_IN_MINUTE * now.getMinutes() +
    now.getSeconds()
  )
}

export function useSecondsSinceMidnight() {
  const secondsSinceMidnight = ref(calculateSecondsSinceMidnight())

  const secondsSinceMidnightInPercentage = computed(
    () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
  )

  let timer = null

  watchEffect(() => {
    if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
      secondsSinceMidnight.value = 0
    }
  })

  onActivated(() => {
    secondsSinceMidnight.value = calculateSecondsSinceMidnight()

    timer = setInterval(() => (secondsSinceMidnight.value += 10 * 60), MILLISECONDS_IN_SECOND)
  })

  onDeactivated(() => clearInterval(timer))

  return {
    secondsSinceMidnightInPercentage
  }
}
