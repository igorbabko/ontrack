<script setup>
import { ref, computed, watchEffect, onActivated, onDeactivated } from 'vue'
import {
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE,
  SECONDS_IN_DAY,
  MINUTES_IN_HOUR,
  HUNDRED_PERCENT
} from '../constants'
import { currentDate } from '../functions'

const secondsSinceMidnight = ref(getSecondsSinceMidnight())
const indicatorRef = ref()

let timer = null

onActivated(() => {
  secondsSinceMidnight.value = getSecondsSinceMidnight()

  timer = setInterval(() => secondsSinceMidnight.value++, MILLISECONDS_IN_SECOND)
})

onDeactivated(() => clearInterval(timer))

const topOffset = computed(
  () => (secondsSinceMidnightInPercentage.value * timelineHeight()) / HUNDRED_PERCENT
)

const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
)

function timelineHeight() {
  if (indicatorRef.value) {
    console.log(indicatorRef.value.parentNode.getBoundingClientRect().height)
  }

  return indicatorRef.value ? indicatorRef.value.parentNode.getBoundingClientRect().height : 0
}

function getSecondsSinceMidnight() {
  const now = currentDate()

  return (
    SECONDS_IN_MINUTE * MINUTES_IN_HOUR * now.getHours() +
    SECONDS_IN_MINUTE * now.getMinutes() +
    now.getSeconds()
  )
}

watchEffect(() => {
  if (secondsSinceMidnightInPercentage.value === HUNDRED_PERCENT) {
    secondsSinceMidnight.value = getSecondsSinceMidnight()
  }
})
</script>

<template>
  <hr
    ref="indicatorRef"
    class="pointer-events-none absolute z-20 w-full border-b-2 border-red-600 opacity-50"
    :style="{ top: `${topOffset}px` }"
  />
</template>
