<script setup>
import TheHeaderProgress from './TheHeaderProgress.vue';

defineProps(['timelineItems', 'activities']);

const emit = defineEmits(['goToTimeline']);
</script>

<template>
  <header class="sticky z-20 top-0 flex justify-between items-center bg-white border-b w-full p-3 z-10">
    <a href="#timeline" @click="emit('goToTimeline')">
      <img src="../assets/logo.png" alt="Logo" class="h-9">
    </a>
    <TheHeaderProgress :activities="activities" :timeline-items="timelineItems" />
  </header>
</template>
