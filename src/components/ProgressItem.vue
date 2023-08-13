<script setup>
import { computed } from 'vue'
import { HUNDRED_PERCENT } from '../constants'
import { getProgressColorClass } from '../functions'
import { calculateTrackedActivitySeconds } from '../timeline-items'
import { calculateActivityCompletionPercentage } from '../activities'

const props = defineProps(['index', 'activity'])

const timeProgress = ['03:00 / 30:00', '15:00 / 30:00', '21:00 / 30:00', '30:00 / 30:00'][
  props.index
]

const percentage = computed(() => {
  const trackedActivitySeconds = calculateTrackedActivitySeconds(props.activity)

  return calculateActivityCompletionPercentage(props.activity, trackedActivitySeconds)
})
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="truncate text-xl">{{ activity.name }}</div>
    <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
      <div
        :class="getProgressColorClass(percentage)"
        :style="`width: ${Math.min(percentage, HUNDRED_PERCENT)}%`"
      />
    </div>
    <div class="flex justify-between font-mono text-sm">
      <span>{{ percentage }}%</span>
      <span>{{ timeProgress }}</span>
    </div>
  </li>
</template>
