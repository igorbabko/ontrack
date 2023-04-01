<script setup>
import { computed } from 'vue';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';
import { getTotalActivitySeconds, filterTrackedActivities, normalizePercentage, getProgressColorClass } from '../functions';

const props = defineProps(['activities', 'timelineItems']);

const progress = computed(() => {
  const percentage = totalActivitySeconds.value * 100 / totalActivitySecondsToComplete.value;

  return normalizePercentage(percentage);
});

const totalActivitySeconds = computed(() => {
  return trackedActivities.value.reduce((totalSeconds, activity) => {
    return totalSeconds + getTotalActivitySeconds(activity, props.timelineItems);
  }, 0);
});

const totalActivitySecondsToComplete = computed(() => {
  return trackedActivities.value.reduce((totalSeconds, activity) => {
    return totalSeconds + activity.secondsToComplete;
  }, 0);
});

const trackedActivities = computed(() => filterTrackedActivities(props.activities));

const progressColorClass = computed(() => getProgressColorClass(progress.value));
</script>

<template>
  <a href="#progress">
    <div v-if="progress === 100" class="flex items-center text-sm gap-1">
      Day complete!
      <CheckCircleIcon class="h-7 text-green-500" />
    </div>
    <div v-else class="text-sm flex items-center gap-1">
      <div>Progress: <span class="font-mono">{{ progress }}%</span></div>
      <div :class="`h-3 w-3 rounded-full ${progressColorClass}`"></div>
    </div>
  </a>
</template>
