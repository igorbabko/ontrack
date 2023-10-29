<script setup>
import { ref, computed } from 'vue'
import { SECONDS_IN_MINUTE, SECONDS_IN_DAY, MINUTES_IN_HOUR, HUNDRED_PERCENT } from '../constants'
import { currentDate } from '../functions'

const secondsSinceMidnight = ref(getSecondsSinceMidnight())
const indicatorRef = ref()

const topOffset = computed(
  () => (secondsSinceMidnightInPercentage.value * timelineHeight()) / HUNDRED_PERCENT
)

const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
)

function timelineHeight() {
  return indicatorRef.value?.parentNode.getBoundingClientRect().height ?? 0
}

function getSecondsSinceMidnight() {
  const now = currentDate()

  return (
    SECONDS_IN_MINUTE * MINUTES_IN_HOUR * now.getHours() +
    SECONDS_IN_MINUTE * now.getMinutes() +
    now.getSeconds()
  )
}
</script>

<template>
  <hr
    ref="indicatorRef"
    class="pointer-events-none absolute z-10 w-full border-b-2 border-red-600"
    :style="{ top: `${topOffset}px` }"
  />
</template>
