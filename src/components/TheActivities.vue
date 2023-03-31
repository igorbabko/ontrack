<script setup>
import ActivityItem from './ActivityItem.vue';
import TheActivityForm from './TheActivityForm.vue';
import EmptyState from './EmptyState.vue';

defineProps(['activities', 'timelineItems']);

const emit = defineEmits(['createActivity', 'deleteActivity', 'setActivitySecondsToComplete']);
</script>

<template>
  <div class="flex flex-grow flex-col justify-between">
    <ul v-if="activities.length" class="divide-y">
      <ActivityItem
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
        :timeline-items="timelineItems"
        @delete="emit('deleteActivity', activity)"
        @set-seconds-to-complete="emit('setActivitySecondsToComplete', { activity, secondsToComplete: $event })" />
    </ul>
    <EmptyState v-else image="../assets/empty.svg" alt="No activities">
      You don't have any activities.
    </EmptyState>
    <TheActivityForm @submit="emit('createActivity', $event)" />
  </div>
</template>
