<script setup>
defineProps(['image', 'alt']);
</script>

<template>
  <div class="p-4 pt-8 flex flex-col items-center gap-4">
    <img src="@/assets/empty.svg" :alt="alt" class="h-48">
    <span class="text-gray-400">
      <slot></slot>
    </span>
  </div>
</template>
