<script setup>
defineProps(['id', 'name', 'goals']);

</script>

<template>
  <li class="p-4 flex justify-between items-center">
    {{ name }}
    <select class="p-1 px-2 rounded">
      <option v-for="timeRange in [30, 60, 120]" :selected="timeRange === goals[id]">
        {{ timeRange }} min
      </option>
    </select>
  </li>
</template>
