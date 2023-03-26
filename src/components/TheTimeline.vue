<script setup>
import { ref, watchEffect, nextTick } from 'vue';
import TimelineItem from './TimelineItem.vue';
import TheTimelineIndicator from './TheTimelineIndicator.vue';

const props = defineProps(['timelineItems', 'activities', 'currentPage'])

const emit = defineEmits(['selectTimelineItemActivity', 'updateTimelineItemActivitySeconds']);

const timelineItemRefs = ref([]);

watchEffect(async () => {
  if (props.currentPage === 'timeline') {
    await nextTick();

    const currentHour = (new Date).getHours();

    const timelineItem = props.timelineItems.find(({ hour }) => hour === currentHour);

    scrollToTimelineItem(timelineItem);
  }
});

function scrollToTimelineItem(timelineItem, options = {}) {
  if (timelineItem.hour > 2) {
    timelineItemRefs.value[timelineItem.hour - 3].$el.scrollIntoView(options);
  } else {
    document.body.scrollIntoView();
  }
}
</script>

<template>
  <div class="mt-7">
    <TheTimelineIndicator :current-page="currentPage" />
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :timeline-item="timelineItem"
        :key="timelineItem.id"
        :activities="activities"
        ref="timelineItemRefs"
        @scroll-to="scrollToTimelineItem(timelineItem, { behavior: 'smooth' })"
        @select-activity="emit('selectTimelineItemActivity', { timelineItem, activityId: $event })"
        @update-activity-seconds="emit('updateTimelineItemActivitySeconds', { timelineItem, activitySeconds: $event })" />
    </ul>
  </div>
</template>
