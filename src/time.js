import { computed, ref } from 'vue'
import {
  HUNDRED_PERCENT,
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_DAY,
  SECONDS_IN_MINUTE
} from './constants'

export function today() {
  const today = new Date()

  today.setHours(0, 0)

  return today
}

export function tomorrow() {
  const tomorrow = new Date(today())

  tomorrow.setDate(tomorrow.getDate() + 1)

  return tomorrow
}

export function isToday(date) {
  return date.toDateString() === today().toDateString()
}

export const now = ref(today())

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
  now.value = new Date(now.value.getTime() + SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND)
}
