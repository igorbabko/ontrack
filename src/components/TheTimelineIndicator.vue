<script setup>
import { ref } from 'vue'
import { SECONDS_IN_MINUTE, SECONDS_IN_DAY, MINUTES_IN_HOUR, HUNDRED_PERCENT } from '../constants'
import { currentDate } from '../functions'

const indicatorRef = ref()

function calculateTopOffset() {
  return (calculateSecondsSinceMidnightInPercentage() * getTimelineHeight()) / HUNDRED_PERCENT
}

function calculateSecondsSinceMidnightInPercentage() {
  return (HUNDRED_PERCENT * calculateSecondsSinceMidnight()) / SECONDS_IN_DAY
}

function calculateSecondsSinceMidnight() {
  const now = currentDate()

  now.setHours(9);

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
    :style="{ top: `${calculateTopOffset()}px` }"
  />
</template>
