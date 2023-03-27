<script setup>
defineProps({
  type: {
    type: String,
    default: 'primary',
  },
});

const typeClasses = {
  primary: 'bg-purple-500 enabled:hover:bg-purple-600 text-white',
  success: 'bg-green-500 enabled:hover:bg-green-600 text-white',
  warning: 'bg-yellow-500 enabledhover:bg-yellow-600 text-white',
  danger: 'bg-red-500 enabled:hover:bg-red-600 text-white',
  neutral: 'bg-gray-100 enabled:hover:bg-gray-200',
};
</script>

<template>
  <button :class="`p-3 rounded disabled:opacity-50 disabled:cursor-not-allowed ${typeClasses[type]}`">
    <slot></slot>
  </button>
</template>
