<script setup>
import { computed } from 'vue';
import { formatTime, getTotalActivitySeconds, normalizePercentage } from '../functions';

const props = defineProps(['activity', 'timelineItems']);

const timeProgress = computed(() => {
  const time = formatTime(getTotalActivitySeconds(props.activity, props.timelineItems));
  const timeToComplete = formatTime(props.activity.secondsToComplete);

  return `${time} / ${timeToComplete}`;
});

const bgColorClass = computed(() => {
  if (progress < 33) return 'bg-red-500';
  if (progress < 66) return 'bg-yellow-500';
  if (progress < 100) return 'bg-blue-500';

  return 'bg-green-500';
});

const progress = computed(() => {
  const activitySeconds = getTotalActivitySeconds(props.activity, props.timelineItems);
  const percentage = activitySeconds * 100 / props.activity.secondsToComplete;

  return normalizePercentage(percentage);
});
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <label for="file" class="text-xl">{{ activity.name }}</label>
    <div :class="`h-5 flex bg-neutral-200 rounded overflow-hidden`">
      <div :class="bgColorClass" :style="{ width: `${progress}%` }" />
    </div>
    <div class="flex justify-between text-sm font-mono">
      <span>{{ progress }}%</span>
      <span>{{ timeProgress }}</span>
    </div>
  </li>
</template>
