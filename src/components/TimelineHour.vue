<script setup>
import { getCurrentHour } from '../functions.js';

defineProps(['hour']);
</script>

<template>
  <a
    href="#"
    :class="`absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-sm border-x-8 border-white text-gray-500 bg-gray-100 rounded px-1 ${hour === getCurrentHour() ? 'font-black text-black' : ''}`">
    {{ hour.toString().padStart(2, 0) }}:00
  </a>
</template>
