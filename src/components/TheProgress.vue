<script setup>
import { computed } from 'vue';
import { filterTrackedActivities } from '../functions';
import { ArrowSmallRightIcon } from '@heroicons/vue/24/outline';
import ProgressItem from './ProgressItem.vue';
import EmptyState from './EmptyState.vue';

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
  <EmptyState v-else>
    <template #image>
      <img src="../assets/no_tracked_activities.svg" alt="No tracked activities" class="h-48">
    </template>
    You don't have any tracked activities
    <template #action>
      <a href="#activities" class="flex items-center gap-1 text-purple-900/60 hover:text-purple-900" @click="emit('goToActivities')">
        Go to activities <ArrowSmallRightIcon class="h-5" />
      </a>
    </template>
  </EmptyState>
</template>
