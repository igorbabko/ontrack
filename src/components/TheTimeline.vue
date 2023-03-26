<script setup>
import { ref, watchEffect, nextTick } from 'vue';
import TimelineItem from './TimelineItem.vue';
import TheTimelineIndicator from './TheTimelineIndicator.vue';

const props = defineProps(['timelineItems', 'activities', 'currentPage'])

const emit = defineEmits(['selectActivity', 'updateTime']);

const timelineItemRefs = ref([]);

watchEffect(async () => {
  if (props.currentPage === 'timeline') {
    await nextTick();

    scrollToHour((new Date).getHours());
  }
});

function scrollToHour(hour, options = {}) {
  if (hour > 2) {
    timelineItemRefs.value[hour - 3].$el.scrollIntoView(options);
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
        v-for="timelineItem, time in timelineItems"
        :time="time"
        :timeline-item="timelineItem"
        :activities="activities"
        ref="timelineItemRefs"
        @scroll-to="scrollToHour(time, { behavior: 'smooth' })"
        @select-activity="emit('selectActivity', { activityId: $event, hour: time })"
        @update-time="emit('updateTime', { hour: time, seconds: $event })" />
    </ul>
  </div>
</template>
