<script setup>
const props = defineProps(['activities', 'goals', 'hours']);

function currentTime(name) {
  return props.hours.filter(({ activity }) => name === activity).reduce((total, hour) => {
    return Math.round((hour.time / 60) + total);
  }, 0);
}
</script>

<template>
  <ul class="divide-y">
    <li v-for="time, activity in goals" class="m-2 p-2 flex justify-between items-center">
      <span>{{ activity }}</span>
      <div class="flex">
        <span>
          {{ currentTime(activity) }} / {{ time }}
        </span>

        <div class="ml-4 px-2" :class="time - currentTime(activity) < 0 ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'">
          {{ time - currentTime(activity) }} min
        </div>
      </div>
    </li>
  </ul>
</template>
