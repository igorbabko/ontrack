<script setup>
defineProps({
  type: {
    type: String,
    default: 'primary',
  },
});

const typeClasses = {
  primary: 'bg-purple-500 hover:bg-purple-600 text-white',
  success: 'bg-green-500 hover:bg-green-600 text-white',
  warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  neutral: 'bg-gray-100 hover:bg-gray-200',
};
</script>

<template>
  <button :class="`p-1 rounded disabled:opacity-50 disabled:cursor-not-allowed ${typeClasses[type]}`">
    <slot></slot>
  </button>
</template>
