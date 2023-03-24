<script setup>
import { ref } from 'vue';
import { useProgressIndicator } from '../composables/progressIndicator';
import TimelineItem from './TimelineItem.vue';
import TheProgressIndicator from './TheProgressIndicator.vue';

defineProps(['timelineItems', 'activities'])

const progressIndicator = ref();

useProgressIndicator(progressIndicator);
</script>

<template>
  <div>
    <TheProgressIndicator ref="progressIndicator" />
    <ul class="divide-y">
      <TimelineItem
        v-for="timelineItem, hour in timelineItems"
        :hour="hour"
        :timeline-item="timelineItem"
        :activities="activities"
        @change-activity="emit('changeActivity', $event)" />
    </ul>
  </div>
</template>
