<script setup>
import { computed } from 'vue'
import { HUNDRED_PERCENT } from '../constants'
import { normalizePercentage } from '../functions'
import { isActivityValid } from '../validators'
import { timelineItems, getTotalActivitySeconds } from '../timeline-items'

const color = ['red', 'yellow', 'blue', 'green'][props.index]
const timeProgress = ['03:00 / 30:00', '15:00 / 30:00', '21:00 / 30:00', '30:00 / 30:00'][
  props.index
]
const props = defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid
  }
})

const progress = computed(() => {
  const activitySeconds = getTotalActivitySeconds(props.activity, timelineItems.value)
  const percentage = (activitySeconds * HUNDRED_PERCENT) / props.activity.secondsToComplete

  return normalizePercentage(percentage)
})
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="truncate text-xl">{{ activity.name }}</div>
    <div :class="`flex h-5 overflow-hidden rounded bg-neutral-200`">
      <div :class="`bg-${color}-500`" :style="`width: ${progress}%`" />
    </div>
    <div class="flex justify-between font-mono text-sm">
      <span>{{ progress }}%</span>
      <span>{{ timeProgress }}</span>
    </div>
  </li>
</template>
