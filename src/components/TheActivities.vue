<script setup>
import ActivityItem from './ActivityItem.vue';
import TheActivityForm from './TheActivityForm.vue';

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
    <div v-else class="p-4 pt-8 flex flex-col items-center gap-4">
      <img src="../assets/empty.svg" alt="No activities" class="h-48">
      <span class="text-gray-400">You don't have any activities.</span>
    </div>
    <TheActivityForm @submit="emit('createActivity', $event)" />
  </div>
</template>
