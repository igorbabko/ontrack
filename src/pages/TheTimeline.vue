<script setup>
import { watchPostEffect, nextTick } from 'vue'
import { PAGE_TIMELINE } from '../constants'
import { currentPage } from '../router'
import { timelineItems, timelineItemRefs, scrollToHour } from '../timeline-items'
import TimelineItem from '../components/TimelineItem.vue'

watchPostEffect(async () => {
  if (currentPage.value === PAGE_TIMELINE) {
    await nextTick()

    scrollToHour(null, false)
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
        ref="timelineItemRefs"
        @scroll-to-hour="scrollToHour(timelineItem.hour)"
      />
    </ul>
  </div>
</template>
