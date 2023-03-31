<script setup>
import EmptyState from './EmptyState.vue';
</script>

<template>
  <EmptyState>
    <template #image>
      <img src="../assets/no_activities.svg" alt="No activities" class="h-48">
    </template>
    You don't have any activities
  </EmptyState>
</template>
