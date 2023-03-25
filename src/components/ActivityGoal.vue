<script setup>
const props = defineProps(['activity', 'goal', 'timelineItems']);

function totalActivityTime() {
  return props.timelineItems
    .filter((timelineItem) => timelineItem.activityId === props.activity.id)
    .reduce((total, timelineItem) => Math.round((timelineItem.time / 60) + total), 0);
}
</script>

<template>
  <div
    v-if="goal"
    :class="`ml-4 px-2 rounded ${goal - totalActivityTime() < 0 ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'}`">
    {{ goal - totalActivityTime() }} min
  </div>
</template>
