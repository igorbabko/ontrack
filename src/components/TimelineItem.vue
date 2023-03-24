<script setup>
import TimelineTime from './TimelineTime.vue';
import TimelineActivity from './TimelineActivity.vue';
import TimelineStopwatch from './TimelineStopwatch.vue';

defineProps(['timelineItem', 'activities', 'time']);
</script>

<template>
  <li class="p-4 flex items-center">
    <TimelineTime :time="time" />
    <TimelineActivity :activity-id="timelineItem.activityId" :activities="activities" />
    <TimelineStopwatch :time="timelineItem.time" />
  </li>
</template>
