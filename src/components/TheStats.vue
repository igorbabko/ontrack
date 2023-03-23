<script setup>
const props = defineProps(['activities', 'goals', 'timelineActivities']);

function currentTime(activityId) {
  return props.timelineActivities
    .filter((timelineActivity) => timelineActivity.activityId === activityId)
    .reduce((total, hour) => Math.round((hour.time / 60) + total), 0);
}
</script>

<template>
  <ul class="divide-y">
    <li v-for="time, activityId in goals" class="p-4 flex justify-between items-center">
      <span>{{ activities[activityId] }}</span>
      <div class="flex">
        {{ currentTime(activityId) }} / {{ time }}
        <div class="ml-4 px-2 rounded"
          :class="time - currentTime(activityId) < 0 ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'">
          {{ time - currentTime(activityId) }} min
        </div>
      </div>
    </li>
  </ul>
</template>
