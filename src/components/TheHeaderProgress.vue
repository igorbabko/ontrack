<script setup>
import { computed } from 'vue';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';
import { getTotalActivitySeconds } from '../functions';

const props = defineProps(['activities', 'timelineItems']);

const progress = computed(() => {
  const activities = props.activities.filter(({ secondsToComplete }) => secondsToComplete);

  const totalActivitySeconds = activities.reduce((totalSeconds, activity) => {
    return totalSeconds + getTotalActivitySeconds(activity, props.timelineItems);
  }, 0);

  const totalSecondsToComplete = activities.reduce((totalSeconds, activity) => {
    return totalSeconds + activity.secondsToComplete;
  }, 0);

  return Math.floor(totalActivitySeconds * 100 / totalSecondsToComplete);
});
</script>

<template>
  <div v-if="progress === 100" class="flex items-center text-sm gap-1">
    Day complete!
    <CheckCircleIcon class="h-7 text-green-500" />
  </div>
  <div v-else class="text-sm">
    Complete: <span class="font-mono">{{ progress }}%</span>
  </div>
</template>
