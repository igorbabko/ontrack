<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
defineProps({ selected: Boolean });
</script>

<template>
  <li class="flex-1">
    <a v-bind="$attrs" :class="['flex', 'flex-col', 'items-center', 'p-2', { 'bg-gray-200': selected }]">
      <slot></slot>
    </a>
  </li>
</template>
