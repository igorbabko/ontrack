<script setup>
import ProgressItem from '../components/ProgressItem.vue'
</script>

<template>
  <ul class="divide-y">
    <ProgressItem v-for="index in [0, 1, 2, 3]" :key="index" :index="index" />
  </ul>
</template>
