<script setup>
import { computed } from 'vue';
import { filterTrackedActivities } from '../functions';
import ProgressItem from './ProgressItem.vue';
import EmptyState from './EmptyState.vue';

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
  <EmptyState v-else image="@/assets/empty.svg" alt="No activities">
    You don't have any activities.
  </EmptyState>
</template>
