<script setup>
defineProps(['time']);
</script>

<template>
  <div class="flex flex-col items-center">
    <span
      :class="['font-mono', 'text-sm', 'bg-gray-100', 'rounded', 'p-1', { 'font-black': time === (new Date).getHours() }]">
      {{ time.toString().padStart(2, 0) }}
    </span>
  </div>
</template>
