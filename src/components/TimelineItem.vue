<script setup>
import TimelineTime from './TimelineTime.vue';
import TimelineActivity from './TimelineActivity.vue';
import StopwatchItem from './StopwatchItem.vue';

defineProps(['timelineItem', 'activities', 'hour']);

const emit = defineEmits(['selectActivity']);
</script>

<template>
  <li class="p-4 flex items-center">
    <TimelineTime :time="hour" />
    <TimelineActivity :activity-id="timelineItem.activityId" :activities="activities" />
    <StopwatchItem :time="timelineItem.time" />
  </li>
</template>
