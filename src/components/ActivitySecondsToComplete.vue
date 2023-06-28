<script setup>
import { formatSeconds, getTotalActivitySeconds } from '../functions'
import { isActivityValid, validateTimelineItems } from '../validators'

const props = defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid
  },
  timelineItems: {
    required: true,
    type: Array,
    validator: validateTimelineItems
  }
})

const seconds = formatSeconds(
  getTotalActivitySeconds(props.activity, props.timelineItems) - props.activity.secondsToComplete
)
</script>

<template>
  <div class="flex items-center rounded bg-purple-100 px-2 font-mono text-xl text-purple-600">
    {{ seconds }}
  </div>
</template>
