<script setup>
import { computed } from 'vue';
import { getCurrentHour } from '../functions';
import BaseSelect from './BaseSelect.vue'
import TimelineHour from './TimelineHour.vue';
import TimelineStopwatch from './TimelineStopwatch.vue';

const props = defineProps(['timelineItem', 'activitySelectOptions']);

const emit = defineEmits(['selectActivity', 'updateActivitySeconds', 'scrollTo']);

const hour = computed(() => `${props.timelineItem.hour.toString().padStart(2, 0)}:00`);
</script>

<template>
  <li class="py-10 px-4 flex flex-col gap-2 relative border-t border-gray-200">
    <TimelineHour
      :class="{ 'bg-purple-900 text-white font-black': timelineItem.hour === getCurrentHour() }"
      @click.prevent="emit('scrollTo')">
      {{ hour }}
    </TimelineHour>
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
