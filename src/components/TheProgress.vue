<script setup>
import { computed } from 'vue';
import { filterTrackedActivities } from '../functions';
import ProgressItem from './ProgressItem.vue';

const props = defineProps(['activities', 'timelineItems']);

const trackedActivities = computed(() => filterTrackedActivities(props.activities));
</script>

<template>
  <ul v-if="trackedActivities.length" class="divide-y">
    <ProgressItem
      v-for="activity in trackedActivities"
      :key="activity.id"
      :activity="activity"
      :timeline-items="timelineItems" />
  </ul>
  <div v-else class="p-4 pt-8 flex flex-col items-center gap-4">
    <img src="../assets/empty.svg" alt="No activities" class="h-48">
    <span class="text-gray-400">You don't have any activities.</span>
  </div>
</template>
