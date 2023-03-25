<script setup>
import TimelineTime from './TimelineTime.vue';
import TimelineActivity from './TimelineActivity.vue';
import TimelineStopwatch from './TimelineStopwatch.vue';

defineProps(['timelineItem', 'activities', 'time']);

const emit = defineEmits(['selectActivity', 'updateTime']);
</script>

<template>
  <li
    :class="['p-4', 'flex', 'gap-1', 'relative', 'border-t', 'border-gray-200', { 'opacity-50 pointer-events-none': time < (new Date).getHours() }]">
    <TimelineTime :time="time" />
    <TimelineActivity
      :activity-id="timelineItem.activityId"
      :activities="activities"
      :time="time"
      @select-activity="emit('selectActivity', $event)" />
    <TimelineStopwatch
      v-if="timelineItem.activityId && time <= (new Date).getHours()"
      :for-current-hour="time === (new Date).getHours()"
      :time="timelineItem.time"
      @update-time="emit('updateTime', $event)" />
  </li>
</template>
