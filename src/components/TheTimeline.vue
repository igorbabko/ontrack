<script setup>
import TimelineItem from './TimelineItem.vue';
import TheTimelineIndicator from './TheTimelineIndicator.vue';

defineProps(['timelineItems', 'activities'])
</script>

<template>
  <div>
    <TheTimelineIndicator />
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
