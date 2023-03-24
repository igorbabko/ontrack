<script setup>
import TimelineItem from './TimelineItem.vue';
import TheProgressIndicator from './TheProgressIndicator.vue';

defineProps(['timelineItems', 'activities'])
</script>

<template>
  <div>
    <TheProgressIndicator />
    <ul class="divide-y">
      <TimelineItem
        v-for="timelineItem, hour in timelineItems"
        :hour="hour"
        :timeline-item="timelineItem"
        :activities="activities"
        @change-activity="emit('changeActivity', $event)" />
    </ul>
  </div>
</template>
