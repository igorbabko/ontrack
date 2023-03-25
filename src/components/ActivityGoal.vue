<script setup>
import { computed } from 'vue';

const props = defineProps(['activity', 'goal', 'timelineItems']);

const label = computed(() => {
  return `${diff.value > 0 ? '+' : ''}${diff.value} min`;
});

const diff = computed(() => {
  return (totalActivityTime() - props.goal); // / 60;
});

function totalActivityTime() {
  return props.timelineItems
    .filter((timelineItem) => timelineItem.activityId === props.activity.id)
    .reduce((total, timelineItem) => Math.round((timelineItem.time / 60) + total), 0);
}
</script>

<template>
  <div :class="`ml-4 px-2 rounded ${diff < 0 ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'}`">
    {{ label }}
  </div>
</template>
