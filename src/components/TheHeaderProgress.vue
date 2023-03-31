<script setup>
import { computed } from 'vue';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';
import { getTotalActivitySeconds, filterTrackedActivities, normalizePercentage } from '../functions';

const props = defineProps(['activities', 'timelineItems']);

const progress = computed(() => {
  const percentage = totalActivitySeconds * 100 / totalActivitySecondsToComplete;

  return normalizePercentage(percentage);
});

const totalActivitySeconds = computed(() => {
  return trackedActivities.reduce((totalSeconds, activity) => {
    return totalSeconds + getTotalActivitySeconds(activity, props.timelineItems);
  }, 0);
});

const totalActivitySecondsToComplete = computed(() => {
  return trackedActivities.reduce((totalSeconds, activity) => {
    return totalSeconds + activity.secondsToComplete;
  }, 0);
});

const trackedActivities = computed(() => filterTrackedActivities(props.activities));
</script>

<template>
  <a href="#progress">
    <div v-if="progress === 100" class="flex items-center text-sm gap-1">
      Day complete!
      <CheckCircleIcon class="h-7 text-green-500" />
    </div>
    <div v-else class="text-sm">
      Progress: <span class="font-mono">{{ progress }}%</span>
    </div>
  </a>
</template>
