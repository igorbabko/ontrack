import { computed, ref } from 'vue'
import { HUNDRED_PERCENT, MILLISECONDS_IN_SECOND, SECONDS_IN_DAY } from './constants'

const currentDate = new Date()

currentDate.setHours(0, 0)

export const now = ref(currentDate)

export const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))

export const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
)

const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILLISECONDS_IN_SECOND)

let timer = null

export function startTimer() {
  updateTime()

  timer = setInterval(updateTime, MILLISECONDS_IN_SECOND)
}

export function stopTimer() {
  clearInterval(timer)
}

function updateTime() {
  now.value = new Date(now.value.getTime() + 5 * 60 * MILLISECONDS_IN_SECOND)
}
