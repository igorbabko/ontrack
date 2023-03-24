<script setup>
import GoalItem from './GoalItem.vue';

const props = defineProps(['activities', 'goals', 'timelineItems']);
</script>

<template>
  <ul class="divide-y">
    <GoalItem
      v-for="time, activityId in goals"
      :time="time"
      :activity-id="activityId"
      :activities="activities"
      :timeline-items="timelineItems" />
  </ul>
</template>
