<script setup>
import { getCurrentHour } from '../functions';
import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue';
import TimelineStopwatch from './TimelineStopwatch.vue';

defineProps(['timelineItem', 'activitySelectOptions']);

const emit = defineEmits(['selectActivity', 'updateActivitySeconds', 'scrollTo']);
</script>

<template>
  <li class="py-10 px-4 flex flex-col gap-2 relative border-t border-gray-200">
    <TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollTo')" />
    <BaseSelect
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      :disabled="timelineItem.hour < getCurrentHour()"
      placeholder="Rest"
      @select="emit('selectActivity', $event)" />
    <TimelineStopwatch
      :timeline-item="timelineItem"
      @update-seconds="emit('updateActivitySeconds', $event)" />
  </li>
</template>
