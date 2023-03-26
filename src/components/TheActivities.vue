<script setup>
import ActivityItem from './ActivityItem.vue';
import ActivityForm from './ActivityForm.vue';

defineProps(['activities', 'timelineItems']);

const emit = defineEmits(['createActivity', 'deleteActivity', 'setActivitySecondsToComplete']);
</script>

<template>
  <div class="flex flex-grow flex-col justify-between">
    <ul class="divide-y">
      <ActivityItem
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
        :timeline-items="timelineItems"
        @delete="emit('deleteActivity', activity)"
        @set-seconds-to-complete="emit('setActivitySecondsToComplete', { activity, secondsToComplete: $event })" />
    </ul>
    <ActivityForm @submit="emit('createActivity', $event)" />
  </div>
</template>
