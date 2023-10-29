<script setup>
import { ref } from 'vue'
import { HUNDRED_PERCENT, SECONDS_IN_DAY, SECONDS_IN_MINUTE, MINUTES_IN_HOUR } from '../constants'

const indicatorRef = ref()

function calculateTopOffset() {
  return (calculateSecondsSinceMidnightInPercentage() * getTimelineHeight()) / HUNDRED_PERCENT
}

function calculateSecondsSinceMidnightInPercentage() {
  return (HUNDRED_PERCENT * calculateSecondsSinceMidnight()) / SECONDS_IN_DAY
}

function calculateSecondsSinceMidnight() {
  const now = new Date()

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
