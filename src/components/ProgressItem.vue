<script setup>
import { computed } from 'vue';
import { formatTime, getTotalActivitySeconds } from '../functions';

const props = defineProps(['activity', 'timelineItems']);

const progressLabel = computed(() => {
  const time = formatTime(getTotalActivitySeconds(props.activity, props.timelineItems));
  const timeToComplete = formatTime(props.activity.secondsToComplete);

  return `${time} / ${timeToComplete}`;
});

const bgColorClass = computed(() => {
  if (percentage < 33) return 'bg-red-500';

  if (percentage < 66) return 'bg-yellow-500';

  if (percentage < 100) return 'bg-blue-500';

  return 'bg-green-500';
});

const percentage = computed(() => {
  const percentage = Math.floor(getTotalActivitySeconds(props.activity, props.timelineItems) * 100 / props.activity.secondsToComplete);

  return percentage < 100 ? percentage : 100;
});
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <label for="file" class="text-xl">{{ activity.name }}</label>
    <div :class="`h-5 flex bg-neutral-200 rounded overflow-hidden`">
      <div :class="bgColorClass" :style="{ width: `${percentage}%` }" />
    </div>
    <div class="flex justify-between text-sm font-mono">
      <span>{{ percentage }}%</span>
      <span>{{ progressLabel }}</span>
    </div>
  </li>
</template>
