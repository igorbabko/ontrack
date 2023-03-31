<script setup>
import { computed } from 'vue';
import { filterTrackedActivities } from '../functions';
import ProgressItem from './ProgressItem.vue';
import TheProgressEmptyState from './TheProgressEmptyState.vue';

const props = defineProps(['activities', 'timelineItems']);

const emit = defineEmits(['goToActivities']);

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
  <TheProgressEmptyState v-else />
</template>
