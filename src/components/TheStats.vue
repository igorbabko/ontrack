<script setup>
import { computed } from 'vue';
import { formatTime, getTotalActivitySeconds } from '../functions';

const props = defineProps(['activities', 'timelineItems']);

function color(activity) {
  const p = percentage(activity);

  if (p < 33) return 'bg-red-600';

  if (p < 66) return 'bg-orange-600';

  if (p < 100) return 'bg-blue-600';

  return 'bg-green-600';
}

function percentage(activity) {
  return Math.round(getTotalActivitySeconds(activity, props.timelineItems) * 100 / activity.secondsToComplete);
}
</script>

<template>
  <div class="divide-y">
    <div v-for="activity in activities.filter(({ secondsToComplete }) => secondsToComplete)"
      class="flex flex-col gap-1 p-4">
      <label for="file" class="text-xl">{{ activity.name }}</label>
      <progress id="file" :class="`rounded h-4 ${color(activity)} [&::-moz-progress-bar]:bg-purple-500`" :max="activity.secondsToComplete"
        :value="getTotalActivitySeconds(activity, timelineItems)">
        70%
      </progress>
      <div class="flex justify-between text-sm font-mono">
        <span>{{ percentage(activity) }}%</span>
        <span>
          {{ formatTime(getTotalActivitySeconds(activity, timelineItems)) }} / {{ formatTime(activity.secondsToComplete)
          }}
        </span>
      </div>
    </div>
  </div>
</template>
