<script setup>
import { computed } from 'vue';
import { formatTime, getTotalActivitySeconds } from '../functions';

const props = defineProps(['activity', 'timelineItems']);

const time = computed(() => {
  const sign = diff.value >= 0 ? '+' : '-';

  return `${sign}${formatTime(diff.value)}`;
});

const diff = computed(() => (getTotalActivitySeconds(props.activity, props.timelineItems) - props.activity.secondsToComplete));
</script>

<template>
  <div
    :class="`flex items-center text-xl font-mono px-2 rounded ${diff < 0 ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'}`">
    {{ time }}
  </div>
</template>
