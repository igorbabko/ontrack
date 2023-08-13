<script setup>
import { computed } from 'vue'
import { HUNDRED_PERCENT } from '../constants'
import { formatSeconds, getProgressColorClass } from '../functions'
import { isActivityValid } from '../validators'
import { calculateTrackedActivitySeconds } from '../timeline-items'
import { calculateActivityCompletionPercentage } from '../activities'

const props = defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid
  }
})

const scaleWidth = computed(() => Math.min(percentage.value, HUNDRED_PERCENT))

const percentage = computed(() => {
  return calculateActivityCompletionPercentage(
    props.activity,
    calculateTrackedActivitySeconds(props.activity)
  )
})
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="truncate text-xl">{{ activity.name }}</div>
    <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
      <div :class="getProgressColorClass(percentage)" :style="`width: ${scaleWidth}%`" />
    </div>
    <div class="flex justify-between font-mono text-sm">
      <span>{{ percentage }}%</span>
      <span>
        {{ formatSeconds(calculateTrackedActivitySeconds(activity)) }} /
        {{ formatSeconds(activity.secondsToComplete) }}
      </span>
    </div>
  </li>
</template>
