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

    scrollToCurrentHour()
  }
});

function scrollToCurrentHour() {
  const currentHour = (new Date).getHours();

  if (currentHour === 0) {
    document.body.scrollIntoView();
  } else {
    timelineItemRefs.value[currentHour - 1].$el.scrollIntoView();
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
        @select-activity="emit('selectActivity', { activityId: $event, hour: time })"
        @update-time="emit('updateTime', { hour: time, seconds: $event })" />
    </ul>
  </div>
</template>
