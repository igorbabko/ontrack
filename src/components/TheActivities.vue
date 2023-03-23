<script setup>
import ActivityItem from './ActivityItem.vue';
import ActivityForm from './ActivityForm.vue';

defineProps(['activities', 'goals']);
</script>

<template>
  <div>
    <ul class="divide-y">
      <ActivityItem v-for="name, id in activities" :id="id" :name="name" :goals="goals" />
    </ul>
    <ActivityForm />
  </div>
</template>
