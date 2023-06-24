<script setup>
import { onActivated } from 'vue'
import {
  timelineItems,
  timelineItemRefs,
  scrollToHour,
  scrollToCurrentHour
} from '../timeline-items'
import TimelineItem from '../components/TimelineItem.vue'

onActivated(() => {
  console.log('activated')

  scrollToCurrentHour(false)
})
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        ref="timelineItemRefs"
        @scroll-to-hour="scrollToHour(timelineItem.hour)"
      />
    </ul>
  </div>
</template>
