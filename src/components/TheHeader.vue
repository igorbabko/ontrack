<script setup>
import { computed } from 'vue';
import TheHeaderLabelDayComplete from './TheHeaderLabelDayComplete.vue';

const props = defineProps(['timelineItems', 'activities']);

const emit = defineEmits(['goToTimeline']);

const isDayComplete = computed(() => {
  return Object.entries(props.activities).every(([activityId, { secondsToComplete }]) => {
    return totalActivitySeconds(activityId) >= secondsToComplete;
  });
});

function totalActivitySeconds(activityId) {
  return props.timelineItems
    .filter((timelineItem) => timelineItem.activityId === activityId)
    .reduce((totalSeconds, timelineItem) => Math.round((timelineItem.activitySeconds/* / 60*/) + totalSeconds), 0);
}
</script>

<template>
  <header class="sticky z-20 top-0 flex justify-between items-center bg-white border-b w-full p-3 z-10">
    <a href="#timeline" @click="emit('goToTimeline')">
      <img src="../assets/logo.png" alt="Logo" class="h-9">
    </a>
    <TheHeaderLabelDayComplete v-if="isDayComplete" />
  </header>
</template>
