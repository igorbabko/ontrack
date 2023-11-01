<script setup>
import { ref, computed, watchEffect } from 'vue'
import {
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE,
  SECONDS_IN_DAY,
  MINUTES_IN_HOUR,
  HUNDRED_PERCENT
} from '../constants'
import { currentDate } from '../functions'

const secondsSinceMidnight = ref(calculateSecondsSinceMidnight())
const indicatorRef = ref()

setInterval(() => (secondsSinceMidnight.value += 10 * 60), MILLISECONDS_IN_SECOND)

const topOffset = computed(
  () => (secondsSinceMidnightInPercentage.value * getTimelineHeight()) / HUNDRED_PERCENT
)

const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
)

watchEffect(() => {
  if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
    secondsSinceMidnight.value = 0
  }
})

function calculateSecondsSinceMidnight() {
  const now = currentDate()

  now.setHours(23)

  return (
    SECONDS_IN_MINUTE * MINUTES_IN_HOUR * now.getHours() +
    SECONDS_IN_MINUTE * now.getMinutes() +
    now.getSeconds()
  )
}

function getTimelineHeight() {
  return indicatorRef.value?.parentNode.getBoundingClientRect().height
}
</script>

<template>
  <hr
    ref="indicatorRef"
    class="pointer-events-none absolute z-10 w-full border-b-2 border-red-600"
    :style="{ top: `${topOffset}px` }"
  />
</template>
