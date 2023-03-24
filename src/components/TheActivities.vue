<script setup>
import ActivityItem from './ActivityItem.vue';
import ActivityForm from './ActivityForm.vue';

defineProps(['activities', 'goals']);

const emit = defineEmits(['add']);
</script>

<template>
  <div>
    <ul class="divide-y">
      <ActivityItem v-for="name, id in activities" :activity="{ id, name }" :goals="goals" />
    </ul>
    <ActivityForm @add="emit('add', $event)" />
  </div>
</template>
