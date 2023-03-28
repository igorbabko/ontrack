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
    :class="['py-10', 'px-4', 'flex', 'flex-col', 'gap-1', 'relative', 'border-t', 'border-gray-200', { 'opacity-50': timelineItem.hour < getCurrentHour() }]">
    <TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollTo')" />
    <TimelineActivity
      :timeline-item="timelineItem"
      :activities="activities"
      @select="emit('selectActivity', $event)" />
    <TimelineStopwatch
      :timeline-item="timelineItem"
      @update-seconds="emit('updateActivitySeconds', $event)" />
  </li>
</template>
