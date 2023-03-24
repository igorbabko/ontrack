<script setup>
import { ref } from 'vue';
import { useProgressIndicator } from '../composables/progressIndicator';
import TimelineActivity from './TimelineActivity.vue';
import TheProgressIndicator from './TheProgressIndicator.vue';
import TheHeader from './TheHeader.vue'

defineProps(['timelineItems', 'activities'])

const progressIndicator = ref();

useProgressIndicator(progressIndicator);
</script>

<template>
  <div>
  <!-- <TheHeader /> -->
    <TheProgressIndicator ref="progressIndicator" />
    <ul class="divide-y">
      <TimelineActivity
        v-for="timelineActivity, hour in timelineItems"
        :hour="hour"
        :timeline-activity="timelineActivity"
        :activities="activities"
        @change-activity="emit('changeActivity', $event)" />
    </ul>
  </div>
</template>
