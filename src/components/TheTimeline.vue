<script setup>
import { ref, watchEffect, nextTick } from 'vue';
import TimelineItem from './TimelineItem.vue';
import TheTimelineIndicator from './TheTimelineIndicator.vue';

const props = defineProps(['timelineItems', 'activities', 'currentPage'])

const emit = defineEmits(['selectActivity']);

const timelineItemRefs = ref([]);

watchEffect(async () => {
  if (props.currentPage === 'timeline') {
    await nextTick();

    scrollToCurrentHour()
  }
});

function scrollToCurrentHour() {
  timelineItemRefs.value[(new Date).getHours()].$el.scrollIntoView();
}
</script>

<template>
  <div>
    <TheTimelineIndicator />
    <ul class="divide-y divide-gray-200">
      <TimelineItem
        v-for="timelineItem, time in timelineItems"
        :time="time"
        :timeline-item="timelineItem"
        :activities="activities"
        ref="timelineItemRefs"
        @select-activity="emit('selectActivity', { activityId: $event, hour: time })" />
    </ul>
  </div>
</template>
