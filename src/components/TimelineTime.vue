<script setup>
defineProps(['time']);
</script>

<template>
  <div class="flex flex-col items-center">
    <span
      class="font-mono text-sm bg-gray-100 rounded p-1"
      :class="[
        { 'text-purple-500': (new Date).getHours() === time },
        { 'text-slate-300': (new Date).getHours() > time }
      ]">{{ time.toString().padStart(2, 0) }}</span>
  </div>
</template>
