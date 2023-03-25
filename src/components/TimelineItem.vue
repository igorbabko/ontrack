<script setup>
import TimelineTime from './TimelineTime.vue';
import TimelineActivity from './TimelineActivity.vue';
import TimelineStopwatch from './TimelineStopwatch.vue';

defineProps(['timelineItem', 'activities', 'time']);
</script>

<template>
  <li class="p-4 flex items-center gap-2">
    <TimelineTime :time="time" />
    <TimelineActivity
      :activity-id="timelineItem.activityId"
      :activities="activities"
      :time="time" />
    <TimelineStopwatch
      v-if="time <= (new Date).getHours()"
      :time="timelineItem.time" />
  </li>
</template>
