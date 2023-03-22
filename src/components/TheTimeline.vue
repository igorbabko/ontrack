<script setup>
import TimelineItem from './TimelineItem.vue';

defineProps(['timeRanges', 'activities'])
</script>

<template>
  <ul>
    <TimelineItem v-for="hour in timeRanges" :hour="hour" :activities="activities" />
  </ul>
</template>
