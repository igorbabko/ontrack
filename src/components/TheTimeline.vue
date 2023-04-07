<script setup>
import { ref, computed, watchEffect, watchPostEffect, nextTick } from 'vue';
import { PAGE_TIMELINE } from '../constants';
import { now } from '../functions';
import TimelineItem from './TimelineItem.vue';
import TheTimelineIndicator from './TheTimelineIndicator.vue';

const props = defineProps(['timelineItems', 'activitySelectOptions', 'currentPage']);

const emit = defineEmits(['setTimelineItemActivity', 'updateTimelineItemActivitySeconds', 'updateTimelineItemStartedTrackingAt']);

defineExpose({ scrollToCurrentTimelineItem });

const timelineItemRefs = ref([]);
const currentTime = ref(now());

const isTracking = computed(() => props.timelineItems.some(({ startedTrackingAt }) => startedTrackingAt));

const isMidnight = computed(() => currentTime.value.toTimeString().substring(0, 8) === '00:00:00');

setInterval(() => currentTime.value = now(), 1000);

watchEffect(() => {
  if (isMidnight.value) emit('midnight');
});

watchPostEffect(async () => { // todo test this scrolling more
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
    <!-- <TheTimelineIndicator :current-page="currentPage" /> -->
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.id"
        :timeline-item="timelineItem"
        :activity-select-options="activitySelectOptions"
        :is-tracking="isTracking"
        :is-current="timelineItem.hour === currentTime.getHours()"
        :current-time="currentTime"
        ref="timelineItemRefs"
        @scroll-to="scrollToTimelineItem(timelineItem)"
        @select-activity="emit('setTimelineItemActivity', { timelineItem, activityId: $event })"
        @toggle-tracking="emit('updateTimelineItemStartedTrackingAt', { timelineItem, isTracked: $event })"
        @update-activity-seconds="emit('updateTimelineItemActivitySeconds', { timelineItem, activitySeconds: $event })" />
    </ul>
  </div>
</template>
