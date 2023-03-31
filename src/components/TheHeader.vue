<script setup>
import TheLogo from './TheLogo.vue';
import TheHeaderProgress from './TheHeaderProgress.vue';

defineProps(['activities', 'timelineItems']);

const emit = defineEmits(['goToTimeline', 'goToProgress']);
</script>

<template>
  <header class="sticky z-20 top-0 flex justify-between items-center bg-white border-b w-full p-3 z-10">
    <TheLogo @click="emit('goToTimeline')" />
    <TheHeaderProgress
      :activities="activities"
      :timeline-items="timelineItems"
      @click="emit('goToProgress')" />
  </header>
</template>
