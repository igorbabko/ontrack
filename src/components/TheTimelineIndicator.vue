<script setup>
import { ref, computed, onActivated, onDeactivated } from 'vue'
import {
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE,
  SECONDS_IN_DAY,
  MINUTES_IN_HOUR,
  HUNDRED_PERCENT
} from '../constants'

const secondsSinceMidnight = ref(getSecondsSinceMidnight())

const indicatorRef = ref()

let a = null

onActivated(() => {
  console.log('activated')

  a = setInterval(
    () => (secondsSinceMidnight.value = getSecondsSinceMidnight()),
    MILLISECONDS_IN_SECOND
  )
})

onDeactivated(() => {
  console.log('deactivated')

  clearInterval(a)
})

const topOffset = computed(() => {
  const secondsPercentage = (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY

  console.log(secondsSinceMidnight.value)

  return (
    (secondsPercentage * indicatorRef.value?.parentNode?.getBoundingClientRect?.()?.height) /
    HUNDRED_PERCENT
  )
})

function getSecondsSinceMidnight() {
  const now = new Date()

  return (
    now.getSeconds() +
    SECONDS_IN_MINUTE * now.getMinutes() +
    SECONDS_IN_MINUTE * MINUTES_IN_HOUR * now.getHours()
  )
}
</script>

<template>
  <hr
    ref="indicatorRef"
    class="pointer-events-none absolute z-10 w-full border-b-2 border-red-600 opacity-50"
    :style="{ top: `${topOffset}px` }"
  />
</template>
