<script setup>
import { computed } from 'vue'
import { formatSeconds } from '../functions'
import { isActivityValid } from '../validators'
import { calculateTrackedActivitySeconds } from '../timeline-items'

const props = defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid
  }
})

const classes = computed(
  () => `flex items-center rounded px-2 font-mono text-xl ${colorClasses.value}`
)

const colorClasses = computed(() =>
  secondsDiff.value < 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
)

const seconds = computed(() => `${sign.value}${formatSeconds(secondsDiff.value)}`)

const sign = computed(() => (secondsDiff.value >= 0 ? '+' : '-'))

const secondsDiff = computed(
  () => calculateTrackedActivitySeconds(props.activity) - props.activity.secondsToComplete
)
</script>

<template>
  <div :class="classes">{{ seconds }}</div>
</template>
