<script setup>
import { trackedActivities } from '../activities'
import ProgressItem from '../components/ProgressItem.vue'
</script>

<template>
  <ul class="divide-y">
    <ProgressItem v-for="activity in trackedActivities" :key="activity.id" :activity="activity" />
  </ul>
</template>
