<script setup>
import TimelineHour from './TimelineHour.vue';
import TimelineActivity from './TimelineActivity.vue';
import TimelineStopwatch from './TimelineStopwatch.vue';

defineProps(['timelineItem', 'activities']);

const emit = defineEmits(['selectActivity', 'updateActivitySeconds', 'scrollTo']);
</script>

<template>
  <li
    :class="['p-4', 'flex', 'gap-1', 'relative', 'border-t', 'border-gray-200', { 'opacity-50 pointer-events-none': timelineItem.hour < (new Date).getHours() }]">
    <TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollTo')" />
    <TimelineActivity
      :activity-id="timelineItem.activityId"
      :activities="activities"
      :hour="timelineItem.hour"
      @select="emit('selectActivity', $event)" />
    <TimelineStopwatch
      v-if="timelineItem.activityId && timelineItem.hour <= (new Date).getHours()"
      :for-current-hour="timelineItem.hour === (new Date).getHours()"
      :seconds="timelineItem.activitySeconds"
      @update-seconds="emit('updateActivitySeconds', $event)" />
  </li>
</template>
