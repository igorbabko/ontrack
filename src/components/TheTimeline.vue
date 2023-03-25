<script setup>
import { ref, onMounted, onUpdated } from 'vue';
import TimelineItem from './TimelineItem.vue';
import TheTimelineIndicator from './TheTimelineIndicator.vue';

defineProps(['timelineItems', 'activities'])

const timelineItemRefs = ref([]);

onMounted(scrollToCurrentHour);
onUpdated(scrollToCurrentHour);

function scrollToCurrentHour() {
  timelineItemRefs.value[(new Date).getHours() - 1].$el.scrollIntoView();
}
</script>

<template>
  <div>
    <!-- <TheTimelineIndicator /> -->
    <ul class="divide-y">
      <TimelineItem
        v-for="timelineItem, time in timelineItems"
        :time="time"
        :timeline-item="timelineItem"
        :activities="activities"
        ref="timelineItemRefs"
        @change-activity="emit('changeActivity', $event)" />
    </ul>
  </div>
</template>
