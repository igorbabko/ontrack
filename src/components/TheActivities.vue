<script setup>
import ActivityItem from './ActivityItem.vue';
import ActivityForm from './ActivityForm.vue';

defineProps(['activities', 'goals']);

const emit = defineEmits(['add', 'delete', 'setGoal']);
</script>

<template>
  <div class="flex flex-grow flex-col justify-between">
    <ul class="divide-y">
      <ActivityItem
        v-for="name, id in activities"
        :activity="{ id, name }"
        :goals="goals"
        @delete="emit('delete', $event)"
        @set-goal="emit('setGoal', $event)"
        />
    </ul>
    <ActivityForm @add="emit('add', $event)" />
  </div>
</template>
