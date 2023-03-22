<script setup>
defineProps(['timeRanges', 'activities'])
</script>

<template>
  <ul>
    <li v-for="hour in timeRanges" class="h-24 border m-2 p-4 flex justify-between items-center">
      {{ hour.id }}
      <select class="p-4">
        <option v-for="activity in activities" :selected="activity.name === hour.activity">{{ activity.name }}</option>
      </select>
    </li>
  </ul>
</template>
