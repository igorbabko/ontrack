<script setup>
import ActivityItem from '../components/ActivityItem.vue'

const activities = ['Coding', 'Reading', 'Training']
</script>

<template>
  <div>
    <ul class="divide-y">
      <ActivityItem v-for="activity in activities" :key="activity" :activity="activity" />
    </ul>
  </div>
</template>
