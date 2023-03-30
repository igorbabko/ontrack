<script setup>
import { formatTime, getTotalActivitySeconds } from '../functions';

const props = defineProps(['activities', 'timelineItems']);

function color(activity) {
  const percentage = getCompletionPercentage(activity);

  if (percentage < 33) return 'bg-red-500';

  if (percentage < 66) return 'bg-yellow-500';

  if (percentage < 100) return 'bg-blue-500';

  return 'bg-green-500';
}

function getProgressLabel(activity) {
  return `${formatTime(getTotalActivitySeconds(activity, props.timelineItems))} / ${formatTime(activity.secondsToComplete)}`;
}

function getCompletionPercentage(activity) {
  const percentage = Math.floor(getTotalActivitySeconds(activity, props.timelineItems) * 100 / activity.secondsToComplete);

  return percentage < 100 ? percentage : 100;
}
</script>

<template>
  <ul v-if="activities.filter(({ secondsToComplete }) => secondsToComplete).length" class="divide-y">
    <li v-for="activity in activities.filter(({ secondsToComplete }) => secondsToComplete)"
      class="flex flex-col gap-1 p-4">
      <label for="file" class="text-xl">{{ activity.name }}</label>
      <div :class="`h-5 flex bg-neutral-200 rounded overflow-hidden`">
        <div :class="`${color(activity)}`" :style="`width: ${getCompletionPercentage(activity)}%`" />
      </div>
      <div class="flex justify-between text-sm font-mono">
        <span>{{ getCompletionPercentage(activity) }}%</span>
        <span>{{ getProgressLabel(activity) }}</span>
      </div>
    </li>
  </ul>
  <div v-else class="p-4 pt-8 flex flex-col items-center gap-4">
    <img src="../assets/empty.svg" alt="No activities" class="h-48">
    <span class="text-gray-400">You don't have any activities.</span>
  </div>
</template>
