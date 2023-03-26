<script setup>
import { computed } from 'vue';
import TheHeaderLabelDayComplete from './TheHeaderLabelDayComplete.vue';

const props = defineProps(['timelineItems', 'goals']);

const emit = defineEmits(['home']);

const isDayComplete = computed(() => {
  return Object.entries(props.goals).every(([activityId, time]) => {
    return totalActivityTime(activityId) >= time;
  });
});

function totalActivityTime(activityId) {
  return props.timelineItems
    .filter((timelineItem) => timelineItem.activityId === activityId)
    .reduce((total, timelineItem) => Math.round((timelineItem.time/* / 60*/) + total), 0);
}
</script>

<template>
  <header class="sticky z-20 top-0 flex justify-between items-center bg-white border-b w-full p-3 z-10">
    <a href="#timeline" @click="emit('home')">
      <img src="../assets/logo1.png" alt="Logo" class="h-9">
    </a>
    <TheHeaderLabelDayComplete v-if="isDayComplete" />
  </header>
</template>
