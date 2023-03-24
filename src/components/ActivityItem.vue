<script setup>
import BaseSelect from './BaseSelect.vue'
import ActivityItemButtonDelete from './ActivityItemButtonDelete.vue'

defineProps(['activity', 'goals']);

const options = {
  0: '0 min',
  30: '30 min',
  60: '60 min',
  90: '90 min',
  120: '120 min',
};
</script>

<template>
  <li class="p-4 flex gap-4 items-center">
    <span class="mr-auto">{{ activity.name }}</span>
    <BaseSelect :selected="goals[activity.id] || 0" :options="options" />
    <ActivityItemButtonDelete />
  </li>
</template>
