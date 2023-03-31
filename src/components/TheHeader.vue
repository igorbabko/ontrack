<script setup>
import { computed } from 'vue';
import { filterTrackedActivities } from '../functions';
import TheHeaderProgress from './TheHeaderProgress.vue';

const props = defineProps(['activities', 'timelineItems']);

defineEmits(['goToTimeline', 'goToProgress']);

const trackedActivities = computed(() => filterTrackedActivities(props.activities));
</script>

<template>
  <header class="sticky z-20 top-0 flex justify-between items-center bg-white border-b w-full p-3 z-10">
    <a href="#timeline" @click="emit('goToTimeline')">
      <img src="../assets/logo.png" alt="Logo" class="h-9">
    </a>
    <TheHeaderProgress
      v-if="trackedActivities.length"
      :activities="activities"
      :timeline-items="timelineItems"
      @click="emit('goToProgress')" />
  </header>
</template>
