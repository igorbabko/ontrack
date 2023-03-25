<script setup>
import { ref, onMounted, onUpdated } from 'vue';
import TimelineItem from './TimelineItem.vue';
import TheTimelineIndicator from './TheTimelineIndicator.vue';

defineProps(['timelineItems', 'activities'])

const emit = defineEmits(['selectActivity']);

const timelineItemRefs = ref([]);

onMounted(scrollToCurrentHour);
onUpdated(scrollToCurrentHour);

function scrollToCurrentHour() {
  timelineItemRefs.value[(new Date).getHours()].$el.scrollIntoView();
}
</script>

<template>
  <div>
    <TheTimelineIndicator />
    <ul class="divide-y">
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
