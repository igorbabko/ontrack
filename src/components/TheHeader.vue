<script setup>
const emit = defineEmits(['home']);
</script>

<template>
  <header class="sticky top-0 bg-slate-200 w-full p-2 z-10">
    <a href="#timeline" @click="emit('home')">
      <img src="../assets/logo.png" alt="Logo" class="w-10">
    </a>
  </header>
</template>
