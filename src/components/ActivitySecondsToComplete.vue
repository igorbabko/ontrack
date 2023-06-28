<script setup>
import { formatSeconds } from '../functions'
import { isActivityValid } from '../validators'

defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid
  }
})
</script>

<template>
  <div class="flex items-center rounded bg-purple-100 px-2 font-mono text-xl text-purple-600">
    {{ formatSeconds(activity.secondsToComplete) }}
  </div>
</template>
