<script setup>
import { computed } from 'vue';
import { formatTime, getTotalActivitySeconds } from '../functions';

const props = defineProps(['activities', 'timelineItems']);
</script>

<template>
  <div class="p-4 space-y-5">
    <div v-for="activity in activities.filter(({ secondsToComplete }) => secondsToComplete)" class="flex flex-col gap-1">
      <label for="file" class="text-xl">{{ activity.name }}</label>
      <progress id="file" :max="activity.secondsToComplete" :value="getTotalActivitySeconds(activity, timelineItems)">
        70%
      </progress>
      <div class="flex justify-between text-sm font-mono">
        <span>{{ Math.round(getTotalActivitySeconds(activity, timelineItems) * 100 / activity.secondsToComplete) }}%</span>
        <span>
          {{ formatTime(getTotalActivitySeconds(activity, timelineItems)) }} / {{ formatTime(activity.secondsToComplete) }}
        </span>
      </div>
    </div>
  </div>
</template>
