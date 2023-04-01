<script setup>
import { computed } from 'vue';
import BaseSelect from './BaseSelect.vue'
import TimelineTime from './TimelineTime.vue';
import TimelineStopwatch from './TimelineStopwatch.vue';

const props = defineProps({
  timelineItem: Object,
  isCurrent: Boolean,
  currentTime: Object,
  activitySelectOptions: Array
});

const emit = defineEmits(['selectActivity', 'updateActivitySeconds', 'scrollTo']);

const time = computed(() => {
  if (props.isCurrent) {
    return props.currentTime.toLocaleTimeString('en-US', { hour12: false }).substring(0, 8);
  } else {
    return `${props.timelineItem.hour.toString().padStart(2, 0)}:00`;
  }
});
</script>

<template>
  <li class="py-10 px-4 flex flex-col gap-2 relative border-t border-gray-200">
    <TimelineTime
      :class="{ 'bg-purple-900 text-white font-black': isCurrent }"
      @click.prevent="emit('scrollTo')">
      {{ time }}
    </TimelineTime>
    <BaseSelect
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      :disabled="timelineItem.hour < currentTime.getHours()"
      placeholder="Rest"
      @select="emit('selectActivity', $event)" />
    <TimelineStopwatch
      :timeline-item="timelineItem"
      :current-time="currentTime"
      @update-seconds="emit('updateActivitySeconds', $event)" />
  </li>
</template>
