<script setup>
import { ref, watchEffect, nextTick } from 'vue';
import { PAGE_TIMELINE } from '../constants';
import TimelineItem from './TimelineItem.vue';
import TheTimelineIndicator from './TheTimelineIndicator.vue';

const props = defineProps(['timelineItems', 'activitySelectOptions', 'currentPage'])

const emit = defineEmits(['setTimelineItemActivity', 'updateTimelineItemActivitySeconds']);

defineExpose({ scrollToCurrentTimelineItem });

const timelineItemRefs = ref([]);
const currentTime = ref(new Date);

setInterval(() => {
  currentTime.value = new Date;
}, 1000);

watchEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick();

    scrollToCurrentTimelineItem(false);
  }
});

function scrollToCurrentTimelineItem(isSmooth = true) {
  const currentHour = currentTime.value.getHours();

  const timelineItem = props.timelineItems.find(({ hour }) => hour === currentHour);

  scrollToTimelineItem(timelineItem, isSmooth);
}

function scrollToTimelineItem(timelineItem, isSmooth = true) {
  const options = { behavior: isSmooth ? 'smooth' : 'instant' };

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
        :activity-select-options="activitySelectOptions"
        :current-time="timelineItem.hour === currentTime.getHours() ? currentTime : null"
        ref="timelineItemRefs"
        @scroll-to="scrollToTimelineItem(timelineItem)"
        @select-activity="emit('setTimelineItemActivity', { timelineItem, activityId: $event })"
        @update-activity-seconds="emit('updateTimelineItemActivitySeconds', { timelineItem, activitySeconds: $event })" />
    </ul>
  </div>
</template>
