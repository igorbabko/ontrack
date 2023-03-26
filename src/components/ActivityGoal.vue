<script setup>
import { computed } from 'vue';

const props = defineProps(['activity', 'timelineItems']);

const label = computed(() => `${diff.value > 0 ? '+' : ''}${diff.value} min`);

const diff = computed(() => (totalActivitySeconds.value - props.activity.secondsToComplete)); // / 60;

const totalActivitySeconds = computed(() => {
  return props.timelineItems
    .filter((timelineItem) => timelineItem.activityId === props.activity.id)
    .reduce((totalSeconds, timelineItem) => Math.round((timelineItem.activitySeconds/* / 60*/) + totalSeconds), 0);
});
</script>

<template>
  <div
    :class="`flex items-center font-mono text-sm ml-4 px-2 rounded ${diff < 0 ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'}`">
    {{ label }}
  </div>
</template>
