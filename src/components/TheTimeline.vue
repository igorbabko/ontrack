<script setup>
import { onUpdated } from 'vue';
import TimelineItem from './TimelineItem.vue';
import TheTimelineIndicator from './TheTimelineIndicator.vue';

defineProps(['timelineItems', 'activities'])

onUpdated(() => {
  console.log('timeline');
});
</script>

<template>
  <div>
    <TheTimelineIndicator />
    <ul class="divide-y">
      <TimelineItem
        v-for="timelineItem, time in timelineItems"
        :time="time"
        :timeline-item="timelineItem"
        :activities="activities"
        @change-activity="emit('changeActivity', $event)" />
    </ul>
  </div>
</template>
