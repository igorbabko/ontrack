<script setup>
import EmptyState from './EmptyState.vue'
</script>

<template>
  <EmptyState>
    <template #image>
      <img src="../assets/img/no_tracked_activities.svg" alt="No tracked activities" class="h-48" />
    </template>
    You don't have any tracked activities
  </EmptyState>
</template>
