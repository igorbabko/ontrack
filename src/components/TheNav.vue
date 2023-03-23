<script setup>
const emit = defineEmits(['go']);
</script>

<template>
  <nav class="sticky bottom-0 bg-white">
    <ul class="flex justify-evenly space-evenly items-center list-style-none h-16 border-t w-screen">
      <li><a href="#timeline" @click="emit('go', 'timeline')">Timeline</a></li>
      <li><a href="#activities" @click="emit('go', 'activities')">Activities</a></li>
      <li><a href="#stats" @click="emit('go', 'stats')">Stats</a></li>
      <!-- <li><a href="#goals" @click="emit('go', 'goals')">Goals</a></li> -->
    </ul>
  </nav>
</template>
