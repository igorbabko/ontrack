<script setup>
defineProps({
  type: {
    type: String,
    default: 'primary',
  },
});

const typeClasses = {
  primary: 'bg-purple-500 hover:bg-purple-600',
  success: 'bg-green-500 hover:bg-green-600',
  warning: 'bg-yellow-500 hover:bg-yellow-600',
  danger: 'bg-red-500 hover:bg-red-600',
};
</script>

<template>
  <button :class="`text-white p-1 rounded disabled:opacity-60 disabled:cursor-not-allowed ${typeClasses[type]}`">
    <slot></slot>
  </button>
</template>
