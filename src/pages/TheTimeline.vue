<script setup>
import { validateTimelineItems } from '../validators'
import TimelineItem from '../components/TimelineItem.vue'

defineProps({
  timelineItems: {
    required: true,
    type: Array,
    validator: validateTimelineItems
  }
})
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
      />
    </ul>
  </div>
</template>
