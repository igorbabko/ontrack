<script setup>
import { HUNDRED_PERCENT } from '../constants'
import { formatSeconds } from '../functions'
import { isActivityValid } from '../validators'
import { useProgress } from '../composables/progress'

const props = defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid
  }
})

const { colorClass, percentage, trackedActivitySeconds } = useProgress(props.activity)
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="truncate text-xl">{{ activity.name }}</div>
    <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
      <div
        :class="['transition-all', colorClass]"
        :style="{ width: `${Math.min(percentage, HUNDRED_PERCENT)}%` }"
      />
    </div>
    <div class="flex justify-between font-mono text-sm">
      <span>{{ percentage }}%</span>
      <span>
        {{ formatSeconds(trackedActivitySeconds) }} /
        {{ formatSeconds(activity.secondsToComplete) }}
      </span>
    </div>
  </li>
</template>
