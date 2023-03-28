<script setup>
import { getCurrentHour } from '../functions';

defineProps(['hour']);
</script>

<template>
  <a
    href="#"
    :class="`absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-lg border-x-8 border-white text-gray-500 bg-gray-100 rounded px-1 ${hour === getCurrentHour() ? 'bg-purple-900 text-white font-black' : ''}`">
    {{ hour.toString().padStart(2, 0) }}:00
  </a>
</template>
