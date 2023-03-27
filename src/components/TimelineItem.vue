<script setup>
import { getCurrentHour } from '../functions.js';
import TimelineHour from './TimelineHour.vue';
import TimelineActivity from './TimelineActivity.vue';
import TimelineStopwatch from './TimelineStopwatch.vue';

defineProps(['timelineItem', 'activities']);

const emit = defineEmits(['selectActivity', 'updateActivitySeconds', 'scrollTo']);
</script>

<template>
  <li
    :class="['py-6', 'px-4', 'flex', 'flex-col', 'gap-1', 'relative', 'border-t', 'border-gray-200', { 'opacity-50 pointer-events-none': timelineItem.hour < getCurrentHour() }]">
    <TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollTo')" />
    <TimelineStopwatch
      v-if="timelineItem.activityId && timelineItem.hour <= getCurrentHour()"
      :for-current-hour="timelineItem.hour === getCurrentHour()"
      :seconds="timelineItem.activitySeconds"
      @update-seconds="emit('updateActivitySeconds', $event)" />
    <TimelineActivity
      :activity-id="timelineItem.activityId"
      :activities="activities"
      :hour="timelineItem.hour"
      @select="emit('selectActivity', $event)" />
  </li>
</template>
