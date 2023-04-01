<script setup>
import ActivityItem from './ActivityItem.vue';
import TheActivityForm from './TheActivityForm.vue';
import TheActivitiesEmptyState from './TheActivitiesEmptyState.vue';

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
    <TheActivitiesEmptyState v-else />
    <TheActivityForm @submit="emit('createActivity', $event)" />
  </div>
</template>
