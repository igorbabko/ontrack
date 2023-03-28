<script setup>
import { ref, watchEffect, nextTick } from 'vue';
import { PAGE_TIMELINE } from '../constants';
import { getCurrentHour } from '../functions';
import TimelineItem from './TimelineItem.vue';
import TheTimelineIndicator from './TheTimelineIndicator.vue';

const props = defineProps(['timelineItems', 'activities', 'currentPage'])

const emit = defineEmits(['setTimelineItemActivity', 'updateTimelineItemActivitySeconds']);

const timelineItemRefs = ref([]);

watchEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick();

    const currentHour = getCurrentHour();

    const timelineItem = props.timelineItems.find(({ hour }) => hour === currentHour);

    scrollToTimelineItem(timelineItem);
  }
});

function scrollToTimelineItem(timelineItem, options = {}) {
  if (timelineItem.hour === 0) {
    document.body.scrollIntoView(options);
  } else {
    timelineItemRefs.value[timelineItem.hour - 1].$el.scrollIntoView(options);
  }
}
</script>

<template>
  <div class="relative mt-7">
    <TheTimelineIndicator :current-page="currentPage" />
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.id"
        :timeline-item="timelineItem"
        :activities="activities"
        ref="timelineItemRefs"
        @scroll-to="scrollToTimelineItem(timelineItem, { behavior: 'smooth' })"
        @select-activity="emit('setTimelineItemActivity', { timelineItem, activityId: $event })"
        @update-activity-seconds="emit('updateTimelineItemActivitySeconds', { timelineItem, activitySeconds: $event })" />
    </ul>
  </div>
</template>
