<script setup>
defineProps(['time']);
</script>

<template>
  <div class="flex flex-col items-center absolute -top-3 inset-x-0">
    <span
      :class="['font-mono', 'text-sm', 'border-x-8', 'border-white', 'text-gray-500', 'bg-gray-200', 'rounded', 'px-1', { 'font-black text-black': time === (new Date).getHours() }]">{{ time.toString().padStart(2, 0) }}:00</span>
  </div>
</template>
