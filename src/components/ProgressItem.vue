<script setup>
import { computed } from 'vue'
import { HUNDRED_PERCENT } from '../constants'
import { formatSeconds, normalizePercentage, getProgressColorClass } from '../functions'
import { isActivityValid } from '../validators'
import { timelineItems, getTotalActivitySeconds } from '../timeline-items'

const props = defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid
  }
})

const progressColorClass = computed(() => getProgressColorClass(progress.value))

const progress = computed(() => {
  const percentage = (activitySeconds.value * HUNDRED_PERCENT) / props.activity.secondsToComplete

  return normalizePercentage(percentage)
})

const timeProgress = computed(
  () =>
    `${formatSeconds(activitySeconds.value)} / ${formatSeconds(props.activity.secondsToComplete)}`
)

const activitySeconds = computed(() => getTotalActivitySeconds(props.activity, timelineItems.value))
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="truncate text-xl">{{ activity.name }}</div>
    <div :class="`flex h-5 overflow-hidden rounded bg-neutral-200`">
      <div :class="progressColorClass" :style="`width: ${progress}%`" />
    </div>
    <div class="flex justify-between font-mono text-sm">
      <span>{{ progress }}%</span>
      <span>{{ timeProgress }}</span>
    </div>
  </li>
</template>
