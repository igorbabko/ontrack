<script setup>
import { useProgress } from '../composables/useProgress';
import { ref } from 'vue';
import TimelineActivity from './TimelineActivity.vue';
import TheProgressIndicator from './TheProgressIndicator.vue';

const a = ref();

defineProps(['timelineActivities', 'activities'])

useProgress(a);
</script>

<template>
  <div>
    <TheProgressIndicator ref="a" />
    <ul class="divide-y">
      <TimelineActivity
        v-for="timelineActivity, hour in timelineActivities"
        :hour="hour"
        :timeline-activity="timelineActivity"
        :activities="activities"
        @change-activity="emit('changeActivity', $event)" />
    </ul>
  </div>
</template>
