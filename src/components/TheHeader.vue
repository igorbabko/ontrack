<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/solid';

const emit = defineEmits(['home']);
</script>

<template>
  <header class="sticky top-0 flex justify-between items-center bg-white border-b w-full p-2 z-10">
    <a href="#timeline" @click="emit('home')">
      <img src="../assets/logo1.png" alt="Logo" class="h-10">
    </a>
    <div class="flex items-center gap-1">
      Day complete!<CheckCircleIcon class="h-7 text-green-500" />
    </div>
  </header>
</template>
