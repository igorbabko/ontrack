<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/solid';

const emit = defineEmits(['home']);
</script>

<template>
  <header class="sticky z-20 top-0 flex justify-between items-center bg-white border-b w-full p-3 z-10">
    <a href="#timeline" @click="emit('home')">
      <img src="../assets/logo1.png" alt="Logo" class="h-9">
    </a>
    <div class="flex items-center text-sm gap-1">
      Day complete!<CheckCircleIcon class="h-7 text-green-500" />
    </div>
  </header>
</template>
