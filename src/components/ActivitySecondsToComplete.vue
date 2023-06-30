<script setup>
import { computed } from 'vue'
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

const classes = computed(
  () =>
    `flex items-center rounded bg-purple-100 px-2 font-mono text-xl text-purple-600 ${colorClasses.value}`
)

const colorClasses = computed(() =>
  secondsDiff.value < 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
)

const seconds = computed(() => `${sign.value}${formatSeconds(secondsDiff.value)}`)

const sign = computed(() => (secondsDiff.value >= 0 ? '+' : '-'))

const secondsDiff = computed(
  () =>
    getTotalActivitySeconds(props.activity, props.timelineItems) - props.activity.secondsToComplete
)
</script>

<template>
  <div :class="classes">{{ seconds }}</div>
</template>
