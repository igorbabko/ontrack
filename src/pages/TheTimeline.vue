<script setup>
import { ref, watchPostEffect, nextTick } from 'vue'
import { PAGE_TIMELINE, MIDNIGHT_HOUR } from '../constants'
import { validateTimelineItems, isPageValid } from '../validators'
import TimelineItem from '../components/TimelineItem.vue'

const props = defineProps({
  timelineItems: {
    required: true,
    type: Array,
    validator: validateTimelineItems
  },
  currentPage: {
    required: true,
    type: String,
    validator: isPageValid
  }
})

defineExpose({ scrollToHour })

const timelineItemRefs = ref([])

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick()

    scrollToHour(null, false)
  }
})

function scrollToHour(hour = null, isSmooth = true) {
  hour ??= new Date().getHours()

  const options = { behavior: isSmooth ? 'smooth' : 'instant' }

  if (hour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView(options)
  } else {
    timelineItemRefs.value[hour - 1].$el.scrollIntoView(options)
  }
}
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        ref="timelineItemRefs"
        @scroll-to-hour="scrollToHour"
      />
    </ul>
  </div>
</template>
